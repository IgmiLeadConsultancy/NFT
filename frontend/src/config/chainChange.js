export async function maticChain() {
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x89' }],
        });
    } catch (switchError) {
        if (switchError.code === 4902) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: '0x89',
                        chainName: 'Polygon',
                        nativeCurrency: {
                            name: 'MATIC',
                            symbol: 'MATIC',
                            decimals: 18,
                        },
                        rpcUrls: ['https://matic-mainnet.chainstacklabs.com'],
                        blockExplorerUrls: ['https://polygonscan.com/'],
                    }]
                })
            } catch (addError) {
                console.log('Error adding Chain');
            }
        }
    }
}

export async function ethChain() {
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x1' }],
        });
    } catch (switchError) {
        console.log('Wallet Not Connected')
    }
}

export async function goerliTestnet() {
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x5' }],
        });
    } catch (switchError) {
        console.log('Wallet Not Connected')
    }
}

export async function maticTestnet() {
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x13881' }],
        });
    } catch (switchError) {
        if (switchError.code === 4902) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: '0x13881',
                        chainName: 'Polygon Mumbai',
                        nativeCurrency: {
                            name: 'MATIC',
                            symbol: 'MATIC',
                            decimals: 18,
                        },
                        rpcUrls: ['https://matic-mumbai.chainstacklabs.com'],
                        blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
                    }]
                })
            } catch (addError) {
                console.log('Error adding Chain');
            }
        }
    }
}

export async function bscTest() {
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x61' }],
        });
    } catch (switchError) {
        if (switchError.code === 4902) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: '0x61',
                        chainName: 'BSC Testnet',
                        nativeCurrency: {
                            name: 'tBNB',
                            symbol: 'tBNB',
                            decimals: 18,
                        },
                        rpcUrls: ['https://data-seed-prebsc-1-s3.binance.org:8545'],
                        blockExplorerUrls: ['https://testnet.bscscan.com/'],
                    }]
                })
            } catch (addError) {
                console.log('Error adding Chain');
            }
        }
    }
}