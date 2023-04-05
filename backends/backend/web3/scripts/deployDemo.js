const { ethers } = require("hardhat");

async function main() {

    const Mint = await ethers.getContractFactory("DemoMint");
    const mint = await Mint.deploy(500000000000000);

    await mint.deployed();
    console.log(
        `Mint deployed to ${mint.address}`
    );

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});


// Mumbai Address
// contract address -> 0xcE8c414Bc9B64121C1a6C9c0F9342Fe05A068c7C

// Bnb Address
// contract address -> 0x2C36D5360320e78EAD37215145633C7811563914