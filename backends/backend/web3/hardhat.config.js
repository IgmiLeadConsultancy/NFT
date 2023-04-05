require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-etherscan');
require("dotenv").config();

const { PRIVATE_KEY, API_URL_BNB, API_URL_MATIC, API_KEY_MATIC, API_KEY_BNB, API_URL_GOERLI } = process.env;

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
    },
    goerli: {
      url: API_URL_GOERLI,
      accounts: [PRIVATE_KEY]
    },
    bnb: {
      url: API_URL_BNB,
      accounts: [PRIVATE_KEY]
    },
    mumbai: {
      url: API_URL_MATIC,
      accounts: [PRIVATE_KEY]
    }
  },
  solidity: {
    version: "0.8.10",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  etherscan: {
    apiKey: API_KEY_BNB
  }
};
