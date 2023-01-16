const mnemonic = require("./checkMnemonic");
const main = async (callback) => {
  // get list of available accounts linked to mnemonic
  const storedMnemonic = mnemonic();
  const { Wallet } = require('ethers');
  let accounts = [];
  for (i = 0; i < 10; i++) {
    let wallet = Wallet.fromMnemonic(storedMnemonic, (`m/44'/60'/0'/0/` + i));
    accounts.push(wallet.address);
    console.log(wallet.address);
  }
}

main();
