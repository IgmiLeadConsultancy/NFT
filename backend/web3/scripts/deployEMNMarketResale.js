const { ethers, upgrades } = require("hardhat");

async function main() {

    const EMNMarket = await ethers.getContractFactory("EMNMarket");
    const emnmarket = await upgrades.deployProxy(EMNMarket, [2500000000000000, 7500000000000000], {
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
