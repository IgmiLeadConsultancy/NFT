import SimpleCrypto from 'simple-crypto-js';
import * as dotenv from 'dotenv';

dotenv.config();

const _secretKey = SimpleCrypto.generateRandom();
console.log(_secretKey);

const ethraw = process.env.PRIVATE_KEY_ETH;
const hhraw = process.env.PRIVATE_KEY_HARDHAT;

export const simpleCrypto = new SimpleCrypto(_secretKey);
export const cipherEth = simpleCrypto.encrypt(ethraw);
export const cipherHH = simpleCrypto.encrypt(hhraw);


export const EMNAddress = '';
export const EMNMarketAddress = '0x871108aB178acc459750231655DCbE8e563340FA';
export const EMNMarketResaleAddress = '';


var hhrpc = "http://localhost:8545";

var goerliRpc = "https://rpc.ankr.com/eth_goerli";

export var mainnet = goerliRpc;