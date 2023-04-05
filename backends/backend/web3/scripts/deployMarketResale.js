const { ethers } = require("hardhat");

async function main() {

    const Marketplaceresale = await ethers.getContractFactory("MarketPlaceResale");
    const marketplaceresale = await Marketplaceresale.deploy("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", 3500000000000000);

    await marketplaceresale.deployed();
    console.log(
        `Marketplaceresale deployed to ${marketplaceresale.address}`
    );

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});


// contract -> 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0