import SimpleCrypto from 'simple-crypto-js';
// require("dotenv").config();

const _secretKey = SimpleCrypto.generateRandom();
console.log(_secretKey);

// const { REACT_APP_PRIVATE_KEY_ETH, REACT_APP_PRIVATE_KEY_HARDHAT } = process.env;

const ethraw = 'fc91132f18e970f2fa2fd3e70a6207f61ebdd15b66759ff2473112b19f1eed59';
const hhraw = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

export const simpleCrypto = new SimpleCrypto(_secretKey);
export const cipherEth = simpleCrypto.encrypt(ethraw);
export const cipherHH = simpleCrypto.encrypt(hhraw);


export const EMNAddressGoerli = '0x45efE1252cec81f5a141E42E62c8aBC975b17773';
export const EMNMarketAddressGoerli = '0xB482bBC11524B13A63EAB68F5A5D5936Aa085EDd';
export const EMNMarketResaleAddressGoerli = '';


export const EMNAddressMumbai = '0x45efE1252cec81f5a141E42E62c8aBC975b17773';
export const EMNMarketAddressMumbai = '0xA422027254Fb72c8e1108673E2F1e26e5Ad7aa52';


var hhrpc = "http://localhost:8545";

var goerliRpc = "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";

var mumbaiRpc = "https://rpc.ankr.com/polygon_mumbai"

export var mainnet = goerliRpc;