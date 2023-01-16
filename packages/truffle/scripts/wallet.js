const fse = require("fse");
const bip39 = require("bip39");
const { hdkey } = require('ethereumjs-wallet');
const args = require("yargs").argv;

function generateAddressesFromSeed(mnemonic, count) {
  let seed = bip39.mnemonicToSeedSync(mnemonic);
  let hdwallet = hdkey.fromMasterSeed(seed);
  let wallet_hdpath = "m/44'/60'/0'/0/";

  let accounts = [];
  for (let i = 0; i < count; i++) {
    let wallet = hdwallet.derivePath(wallet_hdpath + i).getWallet();
    let address = "0x" + wallet.getAddress().toString("hex");
    let privateKey = wallet.getPrivateKey().toString("hex");
    accounts.push({ address: address, privateKey: privateKey });
  }
  return accounts;
}

const main = async () => {

  const url = args.url ? args.url : "http://localhost:3000";
  let mnemonic = fse.readFileSync("./mnemonic.txt").toString().trim();
  if (mnemonic) {
    let wallet = generateAddressesFromSeed(mnemonic, 1);
    console.log("🔐 WALLET address is " + wallet[0].address + "");
    console.log("🔗", url, "/pk#" + wallet[0].privateKey);

    console.log('\n\x1b[36m%s\x1b[0m', "Developers please note: your local ganache node comes with 10 pre-funded accounts containing 1000 ETH each. They can be accessed through web3 via the following command: ")
    console.log("\n\x1b[35m%s\x1b[0m", "const ganacheAccounts = await web3.eth.getAccounts()")
    console.log('\n\x1b[36m%s\x1b[0m', "A list of your accounts and private keys is available in your the console window where you ran", "\x1b[35m", "yarn chain.");
    console.log('\n\x1b[36m%s\x1b[0m', "The wallet and url information provided is for the first ganache account. \n");

  } else {
    console.log("Looks like there is no mnemonic file created yet.");
    console.log(
      "Please run", "\x1b[35m", "yarn generate");
  }

}

main();
