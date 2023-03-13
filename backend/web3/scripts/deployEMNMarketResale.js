const { ethers, upgrades } = require("hardhat");

async function main() {

    const EMNMarketResale = await ethers.getContractFactory("EMNMarketResale");
    const emnmarket = await upgrades.deployProxy(EMNMarketResale, [2500000000000000, 7500000000000000], {
        initializer: 'initialize'
    });
    await emnmarket.deployed();
    console.log(
        `EMNMarket deployed to ${emnmarket.address}`
    );

}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
