const fse = require("fs-extra");
const path = require("path");
const Config = require("@truffle/config");
const config = Config.detect();

const main = async (callback) => {
  const reactContractsFile = '../react-app/src/contracts/deployed_contracts.json';
  fse.remove(reactContractsFile);
  fse.readdir(config.contracts_build_directory).then(files => {
    // don't remove external_contracts file, it is used by the react frontend
    return Promise.all(
      files.filter(file => !file.includes("external"))
        .map(file => { fse.remove(path.join(config.contracts_build_directory, file)) }));
  })
  console.log("\x1b[36m%s\x1b[0m", "All truffle artifacts removed from build directory.",
    "\n",
    "Compile and/or migrate to generate new artifacts");
}

main();
