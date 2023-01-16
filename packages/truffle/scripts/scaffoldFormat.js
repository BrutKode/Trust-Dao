const fse = require("fs-extra");
const path = require("path");
const args = require("yargs").argv;
const TruffleConfig = require("@truffle/config");
const config = TruffleConfig.detect();
const ethers = require("ethers");

const main = async (callback) => {

  // take contracts from artifacts and turn them into the format expected in the react app file,
  // deployed_contracts.json
  async function builtContracts(artifacts, buildDirectory, networkId) {
    let contracts = {};
    artifacts.map((file => {
      const artifact = JSON.parse(fse.readFileSync(path.join(buildDirectory, file)));
      contracts[artifact.contractName] = {
        address: artifact.networks[networkId].address,
        abi: artifact.abi
      }
    }));

    return contracts;
  }

  const network = args.network;

  const provider = new ethers.providers.JsonRpcProvider(
    config.networks[network].url
  );

  const { chainId: networkId } = await provider.getNetwork();

  const buildDirectory = '../react-app/src/contracts/truffle/';
  const contractsFile = '../react-app/src/contracts/deployed_contracts.json';
  const artifacts = fse.readdirSync(buildDirectory);
  const newContracts = await builtContracts(artifacts, buildDirectory, networkId);

  if (fse.existsSync(contractsFile)) {
    const deployedContracts = JSON.parse(await fse.readFile(contractsFile));

    if ([networkId] in deployedContracts) {
      const merged = { ...deployedContracts[networkId][network].contracts, ...newContracts };
      deployedContracts[networkId][network].contracts = merged;
      fse.writeFileSync(contractsFile, JSON.stringify(deployedContracts, null, 2));
    } else {
      deployedContracts[networkId] = {
        [network]: {
          name: network,
          chainId: networkId,
          contracts: newContracts
        }
      }
      fse.writeFileSync(contractsFile, JSON.stringify(deployedContracts, null, 2));
    }
  } else {
    let reactContracts = {};
    reactContracts[networkId] = {
      [network]: {
        name: network,
        chainId: networkId,
        contracts: newContracts
      }
    };
    fse.writeFileSync(contractsFile, JSON.stringify(reactContracts, null, 2));
  }

}
main();
