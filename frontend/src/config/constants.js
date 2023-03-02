import SimpleCrypto from 'simple-crypto-js';
require("dotenv").config();

const _secretKey = SimpleCrypto.generateRandom();
console.log(_secretKey);

// const { REACT_APP_PRIVATE_KEY_ETH, REACT_APP_PRIVATE_KEY_HARDHAT } = process.env;

const ethraw = 'fc91132f18e970f2fa2fd3e70a6207f61ebdd15b66759ff2473112b19f1eed59' // REACT_APP_PRIVATE_KEY_ETH;
const hhraw = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80' // REACT_APP_PRIVATE_KEY_HARDHAT;

export const simpleCrypto = new SimpleCrypto(_secretKey);
export const cipherEth = simpleCrypto.encrypt(ethraw);
export const cipherHH = simpleCrypto.encrypt(hhraw);


export const EMNAddress = '0x08bDd29C55eFaB3CC494c4d9818CB24F8a02fceb';
export const EMNMarketAddress = '0x871108aB178acc459750231655DCbE8e563340FA';
export const EMNMarketResaleAddress = '';


var hhrpc = "http://localhost:8545";

var goerliRpc = "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";

export var mainnet = goerliRpc;