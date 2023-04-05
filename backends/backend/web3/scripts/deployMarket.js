const { ethers } = require("hardhat");

async function main() {

  const Marketplace = await ethers.getContractFactory("MarketPlace");
  const marketplace = await Marketplace.deploy(500000000000000);

  await marketplace.deployed();
  console.log(
    `Marketplace deployed to ${marketplace.address}`
  );

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


// hardhat contract -> 0x5FbDB2315678afecb367f032d93F642f64180aa3


// tokenUri = 'QmSuM6oku4d4EmgCQQGRAc3NaCaUXno94bc6WgNDpWMV9e'


// Mumbai
// contract address -> 0xa9AB68af09873Ce9564c878B2D9A692bDACb7791

// Bnb
// contract address -> 0x10a45F62dD4A89dAfEd0370eeF5D49Ad664469F1