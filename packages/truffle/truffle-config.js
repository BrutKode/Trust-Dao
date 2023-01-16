//
// Select the network you want to deploy to here:
//
const fs = require("fs");
const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const defaultNetwork = "localhost";

const mainnetGwei = 21;

function mnemonic() {
  try {
    // we use the absolute path here because we run a child process
    // as part of the `yarn deploy` command and the relative path
    // may not work
    const absolutePath = path.join(__dirname, "mnemonic.txt")
    const mnemonic = fs.readFileSync(absolutePath).toString().trim();
    return mnemonic;
  } catch (e) {
    if (defaultNetwork !== "localhost") {
      console.log(
        "☢️ WARNING: No mnemonic file created for a deploy account. Try `yarn run chain` and then `yarn run account`."
      );
    }
  }
  return "";
}

module.exports = {
  // Uncommenting the defaults below
  // provides for an easier quick-start with Ganache.
  // You can also follow this format for other networks;
  // see <http://truffleframework.com/docs/advanced/configuration>
  // for more details on how to specify configuration options!
  //
  /**
  * contracts_build_directory tells Truffle where to store compiled contracts
  * artifacts will be stored here, while the contract used by the react frontend is stored in
  * the react-app/src/contracts/deployed_contracts.json
  */
  contracts_build_directory: '../react-app/src/contracts/truffle/',
  networks: {
    localhost: {
      url: "http://localhost:8545",
      network_id: "31337",
      chainId: 31337
      /*
        we set a mnemonic to use with our ganache node, and can deploy through it

      */
    },

    // rinkeby: {
    //   url: `https://rinkeby.infura.io/v3/${process.env.RINKEBY_INFURA_KEY}`,
    //   accounts: [`${process.env.RINKEBY_DEPLOYER_PRIV_KEY}`],
    // },
    // kovan: {
    //   url: `https://rinkeby.infura.io/v3/${process.env.KOVAN_INFURA_KEY}`,
    //   accounts: [`${process.env.KOVAN_DEPLOYER_PRIV_KEY}`],
    // },
    // mainnet: {
    //   url: `https://mainnet.infura.io/v3/${process.env.MAINNET_INFURA_KEY}`,
    //   accounts: [`${process.env.MAINNET_DEPLOYER_PRIV_KEY}`],
    // },
    // ropsten: {
    //   url: `https://ropsten.infura.io/v3/${process.env.ROPSTEN_INFURA_KEY}`,
    //   accounts: [`${process.env.ROPSTEN_DEPLOYER_PRIV_KEY}`],
    // },
    // goerli: {
    //   url: `https://goerli.infura.io/v3/${process.env.GOERLI_INFURA_KEY}`,
    //   accounts: [`${process.env.GOERLI_DEPLOYER_PRIV_KEY}`],
    // },
    // xdai: {
    //   url: 'https://dai.poa.network',
    //   gasPrice: 1000000000,
    //   accounts: [`${process.env.XDAI_DEPLOYER_PRIV_KEY}`],
    // },

    rinkeby: {
      network_id: "*",
      provider: function () {
        return new HDWalletProvider(mnemonic(), "https://rinkeby.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad", 0, 1); // <---- YOUR INFURA ID! (or it won't work)
      },
      url: "https://rinkeby.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad", // <---- YOUR INFURA ID! (or it won't work)

      //    url: "https://speedy-nodes-nyc.moralis.io/XXXXXXXXXXXXXXXXXXXXXXX/eth/rinkeby", // <---- YOUR MORALIS ID! (not limited to infura)
    },
    kovan: {
      network_id: 42,
      provider: function () {
        return new HDWalletProvider(mnemonic(), "https://kovan.infura.io/v3/51d301d360e1472cbf17667e725f1ff9", 0, 1); // <---- YOUR INFURA ID! (or it won't work)
      },
      url: "https://kovan.infura.io/v3/51d301d360e1472cbf17667e725f1ff9"
    },
    ropsten: {
      network_id: "*",
      provider: function () {
        return new HDWalletProvider(mnemonic(), "https://ropsten.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad", 0, 1); // <---- YOUR INFURA ID! (or it won't work)
      },
      url: "https://ropsten.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad", // <---- YOUR INFURA ID! (or it won't work)

      //      url: "https://speedy-nodes-nyc.moralis.io/XXXXXXXXXXXXXXXXXXXXXXXXX/eth/ropsten",// <---- YOUR MORALIS ID! (not limited to infura)
    },
    goerli: {
      network_id: "*",
      provider: function () {
        return new HDWalletProvider(mnemonic(), "https://goerli.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad", 0, 1); // <---- YOUR INFURA ID! (or it won't work)
      },
      url: "https://goerli.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad", // <---- YOUR INFURA ID! (or it won't work)

      //      url: "https://speedy-nodes-nyc.moralis.io/XXXXXXXXXXXXXXXXXXXXXXXXX/eth/goerli", // <---- YOUR MORALIS ID! (not limited to infura)
    },
    xdai: {
      network_id: "100",
      provider: function () {
        return new HDWalletProvider(mnemonic(), "https://rpc.xdaichain.com/", 0, 1);
      },
      url: "https://rpc.xdaichain.com/",
      gasPrice: 1000000000
    },
    polygon: {
      network_id: "*",
      provider: function () {
        return new HDWalletProvider(mnemonic(), "https://speedy-nodes-nyc.moralis.io/XXXXXXXXXXXXXXXXXXXx/polygon/mainnet", 0, 1);// <---- YOUR MORALIS ID! (not limited to infura)
      },
      url: "https://speedy-nodes-nyc.moralis.io/XXXXXXXXXXXXXXXXXXXx/polygon/mainnet", // <---- YOUR MORALIS ID! (not limited to infura)
      gasPrice: 1000000000
    },
    polytest: {
      network_id: "*",
      provider: function () {
        return new HDWalletProvider(mnemonic(), "https://speedy-nodes-nyc.moralis.io/XXXXXXXXXXXXXXXXXXXx/polygon/mumbai", 0, 1); // <---- YOUR MORALIS ID! (not limited to infura)
      },
      url: "https://speedy-nodes-nyc.moralis.io/XXXXXXXXXXXXXXXXXXXXXXX/polygon/mumbai", // <---- YOUR MORALIS ID! (not limited to infura)
      gasPrice: 1000000000
    },

    matic: {
      network_id: "*",
      provider: function () {
        return new HDWalletProvider(mnemonic(), "https://rpc-mainnet.maticvigil.com/", 0, 1);
      },
      url: "https://rpc-mainnet.maticvigil.com/",
      gasPrice: 1000000000
    },
    rinkebyArbitrum: {
      network_id: "*",
      provider: function () {
        return new HDWalletProvider(mnemonic(), "https://rinkeby.arbitrum.io/rpc", 0, 1);
      },
      url: "https://rinkeby.arbitrum.io/rpc",
      gasPrice: 0,
      companionNetworks: {
        l1: "rinkeby",
      }
    },
    localArbitrum: {
      network_id: "*",
      provider: function () {
        return new HDWalletProvider(mnemonic(), "http://localhost:8547", 0, 1);
      },
      url: "http://localhost:8547",
      gasPrice: 0,
      companionNetworks: {
        l1: "localArbitrumL1",
      },
    },
    localArbitrumL1: {
      network_id: "*",
      provider: function () {
        return new HDWalletProvider(mnemonic(), "http://localhost:7545", 0, 1);
      },
      url: "http://localhost:7545",
      gasPrice: 0,
      companionNetworks: {
        l2: "localArbitrum",
      },
    },
    optimism: {
      network_id: "*",
      provider: function () {
        return new HDWalletProvider(mnemonic(), "https://mainnet.optimism.io", 0, 1);
      },
      url: "https://mainnet.optimism.io",
      companionNetworks: {
        l1: "mainnet",
      },
    },
    kovanOptimism: {
      network_id: "*",
      provider: function () {
        return new HDWalletProvider(mnemonic(), "https://kovan.optimism.io", 0, 1);
      },
      url: "https://kovan.optimism.io",
      companionNetworks: {
        l1: "kovan",
      },
    },
    localOptimism: {
      network_id: "*",
      provider: function () {
        return new HDWalletProvider(mnemonic(), "http://localhost:8545", 0, 1);
      },
      url: "http://localhost:8545",
      companionNetworks: {
        l1: "localOptimismL1",
      },
    },
    localOptimismL1: {
      network_id: "*",
      provider: function () {
        return new HDWalletProvider(mnemonic(), "http://localhost:9545", 0, 1);
      },
      url: "http://localhost:9545",
      gasPrice: 0,
      companionNetworks: {
        l2: "localOptimism",
      },
    },
    localAvalanche: {
      network_id: "*",
      provider: function () {
        return new HDWalletProvider(mnemonic(), "http://localhost:9650/ext/bc/C/rpc", 0, 1);
      },
      url: "http://localhost:9650/ext/bc/C/rpc",
      gasPrice: 225000000000,
      chainId: 43112
    },
    fujiAvalanche: {
      network_id: "*",
      provider: function () {
        return new HDWalletProvider(mnemonic(), "https://api.avax-test.network/ext/bc/C/rpc", 0, 1);
      },
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      gasPrice: 225000000000,
      chainId: 43113
    },
    mainnetAvalanche: {
      network_id: "*",
      provider: function () {
        return new HDWalletProvider(mnemonic(), "https://api.avax.network/ext/bc/C/rpc", 0, 1);
      },
      url: "https://api.avax.network/ext/bc/C/rpc",
      gasPrice: 225000000000,
      chainId: 43114
    },
    testnetHarmony: {
      network_id: "*",
      provider: function () {
        return new HDWalletProvider(mnemonic(), "https://api.s0.b.hmny.io", 0, 1);
      },
      url: "https://api.s0.b.hmny.io",
      gasPrice: 1000000000,
      chainId: 1666700000
    },
    mainnetHarmony: {
      network_id: "*",
      provider: function () {
        return new HDWalletProvider(mnemonic(), "https://api.harmony.one", 0, 1);
      },
      url: "https://api.harmony.one",
      gasPrice: 1000000000,
      chainId: 1666600000
    },
  },
  //
  // Truffle DB is currently disabled by default; to enable it, change enabled:
  // false to enabled: true. The default storage location can also be
  // overridden by specifying the adapter settings, as shown in the commented code below.
  //
  // NOTE: It is not possible to migrate your contracts to truffle DB and you should
  // make a backup of your artifacts to a safe location before enabling this feature.
  //
  // After you backed up your artifacts you can utilize db by running migrate as follows:
  // $ truffle migrate --reset --compile-all
  //
  // db: {
  // enabled: false,
  // host: "127.0.0.1",
  // adapter: {
  //   name: "sqlite",
  //   settings: {
  //     directory: ".db"
  //   }
  // }
  // }
  api_keys: {
    etherscan: 'PSW8C433Q667DVEX5BCRMGNAH9FSGFZ7Q8'
  },
  // for more information on the truffle-plugin-verify package please see: https://github.com/rkalis/truffle-plugin-verify
  plugins: ['truffle-plugin-verify'],
  compilers: {
    solc: {
      version: "0.8.0",
      settings: {
        optimizer: {
          enabled: true,
          runs: 800
        }
      }
    }
  }
};
