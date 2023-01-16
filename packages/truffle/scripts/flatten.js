//usage: truffle flatten contracts/YourContract.sol
const flatten = require("truffle-flattener");
const fse = require("fs-extra");

const main = async (callback) => {
  const fileToFlatten = process.argv[2];
  const flattenedFile = await flatten([fileToFlatten]);

  await fse.ensureFile("dist/" + fileToFlatten);
  await fse.writeFile("dist/" + fileToFlatten, flattenedFile);
  console.log(flattenedFile);
  console.log("Flattened contract file was saved to packages/truffle/dist/" + fileToFlatten + "\n");
  console.warn("\x1b[36m%s\x1b[0m", "Developers please note: for most use cases, it is likely unnecessary to flatten your contracts.",
    "\n",
    "Check out the truffle-plugin-verify package here: https://www.npmjs.com/package/truffle-plugin-verify if trying to verify Etherscan contracts!");
}


main();
