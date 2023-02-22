require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

const { API_URL, PRIVATE_KEY, API_KEY } = process.env;

module.exports = {
  solidity: {
    version: "0.8.4",
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    goerli: {
      url: API_URL,
      accounts: [PRIVATE_KEY]
    },
  },
  etherscan: {
    apiKey: API_KEY
  }
};
