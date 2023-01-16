const fs = require("fs");
const mnemonic = function () {
  try {
    const mnemonic = fs.readFileSync("./mnemonic.txt").toString().trim();
    return mnemonic;
  } catch (e) {
    console.log("No mnemonic detected. Run `yarn generate` to generate a mnemonic.");
  }
  return "";
}

module.exports = mnemonic;
