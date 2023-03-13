const { ethers, upgrades } = require("hardhat");

async function main() {

    const EMN = await ethers.getContractFactory("EMN");
    const emn = await upgrades.deployProxy(EMN, ['0xA422027254Fb72c8e1108673E2F1e26e5Ad7aa52', 7500000000000000], {
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


// Goerli
// contract(containing state variables) -> 0x45efE1252cec81f5a141E42E62c8aBC975b17773
// contract(containing logical implementation) -> 0x480b1d59BD8c96aCC52bA4919c3e5Dc93905712F
// proxy admin - 0xf4D000055B4CEe34f248172f381236559De3B98d


// Polygon
// contract(containing state variables) -> 0x63E84Ab8Ad7De415AA275AF567f958F6187b84ae
// contract(containing logical implementation) -> 0xD05B2A8CfE094eE0cC32EBB32d5f6C898B5C52Bd
// proxy admin -> 0xf22428AE6EC0a4136D691A751D88Ecda7233CA47