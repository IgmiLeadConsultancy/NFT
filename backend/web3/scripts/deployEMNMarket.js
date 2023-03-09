const { ethers, upgrades } = require("hardhat");

async function main() {

  const EMNMarket = await ethers.getContractFactory("EMNMarketV1");
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


// tokenUri = 'QmSuM6oku4d4EmgCQQGRAc3NaCaUXno94bc6WgNDpWMV9e'

// Goerli
// contract(containing state variables) address -> 0xB482bBC11524B13A63EAB68F5A5D5936Aa085EDd
// contract(containing logical implementation) -> 0x13CE6d9c77Feb243aAD8d549B0615cFF6D13FD03
// proxy admin -> 0xf4D000055B4CEe34f248172f381236559De3B98d


// Mumbai
// contract(containing state variables) address -> 0xA422027254Fb72c8e1108673E2F1e26e5Ad7aa52
// contract(containing logical implementation) -> 0x802bD46f3F1C304Fb44bc45b51891151816Ac488
// proxy admin -> 0xf22428AE6EC0a4136D691A751D88Ecda7233CA47