const { ethers, upgrades } = require("hardhat");

async function main() {

    const EMN = await ethers.getContractFactory("EMN");
    const emn = await upgrades.deployProxy(EMN, ['0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0', 7500000000000000], {
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
