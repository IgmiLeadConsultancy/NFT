require('@nomiclabs/hardhat-ethers');
require('@openzeppelin/hardhat-upgrades');

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
    },
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
};
