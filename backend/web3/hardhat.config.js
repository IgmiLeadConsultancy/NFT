require('@nomiclabs/hardhat-ethers');
require('@openzeppelin/hardhat-upgrades');
require("dotenv").config();

const { PRIVATE_KEY, API_KEY_GOERLI, API_URL_GOERLI, API_URL_MATIC, API_KEY_MATIC } = process.env;

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
    },
    goerli: {
      url: API_URL_GOERLI,
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
    apiKey: {
      goerli: API_KEY_GOERLI,
      polygonMumbai: API_KEY_MATIC
    }
  }
};
