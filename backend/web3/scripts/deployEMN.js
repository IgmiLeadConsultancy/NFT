const { ethers, upgrades } = require("hardhat");

async function main() {

    const EMN = await ethers.getContractFactory("EMN");
    const emn = await upgrades.deployProxy(EMN, ['0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9', 7500000000000000], {
        initializer: 'initialize'
    });
    await emn.deployed();
    console.log(
        `EMN deployed to ${emn.address}`
    );

}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
