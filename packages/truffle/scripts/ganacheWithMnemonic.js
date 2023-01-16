const bip39 = require("bip39");
const fse = require("fse");
const { spawnSync } = require("child_process");
const args = require("yargs").argv;
const TruffleConfig = require("@truffle/config");

const generateMnemonic = () => {
  //generate mnemonic and save it to a file for easy lookup when developing
  const mnemonic = bip39.generateMnemonic();
  console.log("Mnemonic generated: ", mnemonic);
  fse.writeFileSync("./mnemonic.txt", mnemonic.toString());
  console.log("Mnemonic saved at mnemonic.txt in your truffle project.",
    "This mnemonic is only for local testing purposes");
  return mnemonic;
}
const getDefaultParams = (mnemonic) => {
  let params;
  const config = TruffleConfig.detect();
  // if we have localhost configured, use the chain id and network id that are configured to run ganache
  if (config.networks["localhost"]) {
    const mnemonicParam = ["-m", mnemonic];
    try {
      params = [...mnemonicParam, "--chain.chainId", config.networks["localhost"]["chainId"], "--networkId", config.networks["localhost"]["network_id"]];
    } catch (e) {
      // config file comes configured with a chainId and network_id but in case the user deletes them here is an error
      console.log("please set chainId and network_id for your localhost in truffle-config.js in order to run a chain with those settings");
    }

  } else {
    //default to the chain and network ids that the frontend expects
    params = ["-m", mnemonic, "--chain.chainId", 31337, "--networkId", 31337];
  }
  if (!args.network) {
    console.log("none")
    args.network = "localhost";

  } else {
    console.log("hello!");
    params = ["-m", mnemonic];
  }
  return params;
}

const main = async () => {
  //check if a mnemonic already exists
  const mnemonicExists = fse.existsSync("./mnemonic.txt");
  if (mnemonicExists) {
    const mnemonic = fse.readFileSync("./mnemonic.txt");
    //start ganache with mnemonic
    spawnSync("ganache", getDefaultParams(mnemonic), { stdio: 'inherit' });
  } else {
    //create mnemonic
    const secret = generateMnemonic();
    //start ganache with mnemonic
    spawnSync("ganache", getDefaultParams(secret), { stdio: 'inherit' });
  }
}
main();

