const { ethers, upgrades } = require("hardhat");

async function main() {

    const EMN = await ethers.getContractFactory("EMN");
    const emn = await upgrades.deployProxy(EMN, ['0x871108aB178acc459750231655DCbE8e563340FA', 7500000000000000], {
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


// contract address - 0x5c264D04fB61D8b55927E01f86A24903b81e22a4
// proxy address - 0x08bDd29C55eFaB3CC494c4d9818CB24F8a02fceb
// proxy admin - 0xf4D000055B4CEe34f248172f381236559De3B98d