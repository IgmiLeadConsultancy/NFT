const { ethers } = require("hardhat");

async function main() {

  const NFT = await ethers.getContractFactory('NFT');

  const nft = await NFT.deploy();

  await nft.deployed();

  console.log(`NFT contract deployed to ${nft.address}`);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// Contract address - 0x07D36Fde6F0d9656E34b611F032cFf53107A8563