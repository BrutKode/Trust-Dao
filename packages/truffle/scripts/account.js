// get balance information for the deployment account
const qrcode = require("qrcode-terminal");
const ethers = require("ethers");
const DEBUG = false;
const TruffleConfig = require("@truffle/config");
const config = TruffleConfig.detect();
const mnemonic = require("./checkMnemonic");

const main = async () => {
  try {
    const storedMnemonic = mnemonic();
    const wallet = ethers.Wallet.fromMnemonic(storedMnemonic);
    const address = wallet.address;

    qrcode.generate(address);
    console.log("‍📬 Deployer Account is " + address);
    for (const n in config.networks) {
      try {
        const provider = new ethers.providers.JsonRpcProvider(
          config.networks[n].url
        );
        const balance = await provider.getBalance(address);
        console.log(" -- " + n + " --  -- -- 📡 ");
        console.log("   balance: " + ethers.utils.formatEther(balance));
        console.log(
          "   nonce: " + (await provider.getTransactionCount(address))
        );
      } catch (e) {
        if (DEBUG) {
          console.log(e);
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
}

main();
