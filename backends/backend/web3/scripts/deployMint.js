const { ethers } = require("hardhat");

async function main() {

    const Mint = await ethers.getContractFactory("Mint");
    const mint = await Mint.deploy("0x10a45F62dD4A89dAfEd0370eeF5D49Ad664469F1", 500000000000000);

    await mint.deployed();
    console.log(
        `Mint deployed to ${mint.address}`
    );

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});


// hardhat contract -> 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512


// Mumbai
// contract address -> 0xE05C911AcAbFCEA3A2CDbdbF8acA86B35Ebd4517

// Bnb
// contract address -> 0x7ca86f2c983A271427b5aFF772DA6417f41acB96