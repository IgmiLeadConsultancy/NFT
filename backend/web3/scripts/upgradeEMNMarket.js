const { ethers, upgrades } = require("hardhat");

const proxyAddress = '0x871108aB178acc459750231655DCbE8e563340FA'

async function main() {
    const EMNMarketV2 = await ethers.getContractFactory("EMNMarketV2");
    await upgrades.upgradeProxy(proxyAddress, EMNMarketV2);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

// contract address - 0x40567DDe024B83A967A76A8d1963Bf46713A2401
// proxy address - 0x871108aB178acc459750231655DCbE8e563340FA
// proxy admin - 0xf4D000055B4CEe34f248172f381236559De3B98d