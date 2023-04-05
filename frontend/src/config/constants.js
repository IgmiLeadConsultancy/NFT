import SimpleCrypto from 'simple-crypto-js';
// require("dotenv").config();

const _secretKey = SimpleCrypto.generateRandom();

// const { REACT_APP_PRIVATE_KEY_ETH, REACT_APP_PRIVATE_KEY_HARDHAT } = process.env;

const ethraw = 'fc91132f18e970f2fa2fd3e70a6207f61ebdd15b66759ff2473112b19f1eed59';
const hhraw = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

export const simpleCrypto = new SimpleCrypto(_secretKey);
export const cipherEth = simpleCrypto.encrypt(ethraw);
export const cipherHH = simpleCrypto.encrypt(hhraw);


// emn contract export const EMNAddressGoerli = '0x45efE1252cec81f5a141E42E62c8aBC975b17773';
export const EMNAddressGoerli = "0x2CE917D40d548Af11b6F7ac8Ed80fB4A9E3e69db"
export const EMNMarketAddressGoerli = '0xB482bBC11524B13A63EAB68F5A5D5936Aa085EDd';
export const EMNMarketResaleAddressGoerli = '';


export const MintAddressMumbai = '0xE05C911AcAbFCEA3A2CDbdbF8acA86B35Ebd4517';
export const MarketAddressMumbai = '0xa9AB68af09873Ce9564c878B2D9A692bDACb7791';


export const BscMintAddress = "0x7ca86f2c983A271427b5aFF772DA6417f41acB96";
export const BscMarketAddress = "0x10a45F62dD4A89dAfEd0370eeF5D49Ad664469F1";


// web3 storage token
export const web3storageToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDYxNDRlMkI5MkU5NDIzOThmRmJGMzU3NkRmZjZCQ0NFYWFCMTUwOTciLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Nzk0ODkzNzMzMzYsIm5hbWUiOiJtYXJrZXRwbGFjZSJ9.ftOFgCgBw0VOgPHb2EQkZ11wrvu4e_ifZ_2rGeCpMXM";


var hhrpc = "http://localhost:8545";

export const goerliRpc = "https://rpc.ankr.com/eth_goerli";

export const mumbaiRpc = "https://rpc.ankr.com/polygon_mumbai";

export const bscRpc = "https://data-seed-prebsc-1-s2.binance.org:85"

export var mainnet = mumbaiRpc;