const { ethers, upgrades } = require("hardhat");

const proxyAddress = '0x871108aB178acc459750231655DCbE8e563340FA'

async function main() {
    const EMNMarketV2 = await ethers.getContractFactory("EMNMarketV3");
    await upgrades.upgradeProxy(proxyAddress, EMNMarketV2);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

// contract address - 0x7C4F1672B928E1eA89881d985d10C5FcB4084f93
// proxy address - 0x871108aB178acc459750231655DCbE8e563340FA
// proxy admin - 0xf4D000055B4CEe34f248172f381236559De3B98d