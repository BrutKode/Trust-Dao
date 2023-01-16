const main = async (callback) => {

  try {
    // process.argv[6] should be the account address we are querying
    console.log(await web3.eth.getBalance(process.argv[6]) + " ETH");
  } catch (err) {
    console.log(err.message);

  }
}

module.exports = main;
