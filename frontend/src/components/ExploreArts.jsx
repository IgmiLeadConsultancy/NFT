import React, { useState, useEffect } from "react";
import { ethers } from 'ethers';
import axios from "axios";

// import { Redirect } from "react-router-dom";
import Footer from "./common/Footer";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Redirect } from "react-router-dom";

import EMNMarket from '../config/EMNMarket.json';
import EMN from '../config/EMN.json';
import { EMNMarketAddress, cipherHH, mainnet, simpleCrypto, EMNAddress, cipherEth } from "../config/constants";


const AddartCollectionss = () => {



    // const [allArts, setallArts] = useState([]);

    // const getallArts = async () => {
    //     try {
    //         const resp = await axios.get("http://localhost:5000/Fetch-All-Users-Arts");
    //         setallArts(resp.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // useEffect(() => {
    //     getallArts();
    // }, []);


    const [resalePrice, updateresalePrice] = useState({ price: '' })
    const [nfts, setNfts] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded')
    const [hhnfts, hhsetNfts] = useState([])
    useEffect(() => {
        // connectUser();
        getAllNFTs();
    }, [nfts])

    // async function connectUser() {
    //     if (window.ethereum) {
    //         var web3 = new Web3(window.ethereum);
    //         await window.ethereum.send('eth_requestAccounts');
    //         var accounts = await web3.eth.getAccounts();
    //         var account = accounts[0];
    //     }
    //     getUser(account)
    // }

    // async function loadNewSaleNFTs() {
    //     const hhPrivkey = simpleCrypto.decrypt(cipherHH)
    //     const provider = new ethers.providers.JsonRpcProvider(mainnet)
    //     const wallet = new ethers.Wallet(hhPrivkey, provider);
    //     const tokenContract = new ethers.Contract(EMNAddress, EMN, wallet)
    //     const marketContract = new ethers.Contract(EMNMarketAddress, EMNMarket, wallet)
    //     const data = await marketContract.getAvailableNft()
    //     const items = await Promise.all(data.map(async i => {
    //         const tokenUri = await tokenContract.tokenURI(i.tokenId)
    //         const meta = await axios.get(tokenUri)
    //         let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
    //         let item = {
    //             price,
    //             tokenId: i.tokenId.toNumber(),
    //             seller: i.seller,
    //             owner: i.owner,
    //             image: meta.data.image,
    //             name: meta.data.name,
    //             description: meta.data.description,
    //         }
    //         return item
    //     }))
    //     hhsetNfts(items)
    // }

    // async function buyNewNft(nft) {
    //     const provider = new ethers.providers.JsonRpcProvider();
    //     const signer = provider.getSigner();
    //     const contract = new ethers.Contract(cipherHH, EMNMarketAddress, signer);

    //     const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
    //     const transaction = await contract.EMNMarket(nft.nftContract, nft.tokenId, {
    //         value: price
    //     })
    //     await transaction.wait()
    //     loadNewSaleNFTs()
    // }

    async function getAllNFTs() {
        const key = simpleCrypto.decrypt(cipherEth);
        const provider = new ethers.providers.JsonRpcProvider(mainnet);
        const wallet = new ethers.Wallet(key, provider);
        const signer = wallet.provider.getSigner(wallet.address);
        const contract = new ethers.Contract(EMNMarketAddress, EMNMarket, signer);
        // const itemArray = [];
        // itemArray = await contract.getAvailableNft();
        const data = await contract.getAvailableNft();

        const items = await data.map(async i => {
            // const tokenContract = await i.nftContract;
            const tokenUri = await contract.tokenURI(i.tokenId);
            const meta = await axios.get(tokenUri);
            let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
            let item = {
                price,
                tokenId: i.tokenId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                image: meta.data.image,
                name: meta.data.name,
                description: meta.data.description,
            };
            return item
        });

        setNfts(items);
        setLoadingState('loaded');
    }








    const IsLoggedIn = window.localStorage.getItem("userLoggedIn");
    if (IsLoggedIn !== "true") {

        return <Redirect to="/user/login" />;
    }


    //  else
    //  {
    //     window.location.href="" 
    //  }


    const refreshButton = () => {
        window.location.reload();
    }



    return (
        <div className="wrapper">

            <div>

            </div>
            <div className="">

                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-12" align="center">
                                <h1 className="m-0 text-light">Explore Arts Collections</h1>
                            </div>
                            <div>
                                <Button className="m-0 bg-blue text-light" onClick={refreshButton}>
                                    Refresh to see new new collection
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="content">
                    <div className="container">
                        <div className="row">
                            {nfts.length === 0 ? (<h1 className="text-white">No nfts to display</h1>) :
                                (nfts.map((nft) => (
                                    <div className="col-md-4 all-arts" align="center">
                                        <div className="img">
                                            <img src={nft.image} alt="" style={{ width: "300px", height: "400px" }} />
                                        </div>
                                        <br />
                                        <div className="info text-light" align="center">
                                            <p className="text-warning">Name: &nbsp; {nft.name}</p>
                                            <p className="text-warning">Token Id: &nbsp; {nft.tokenId}</p>
                                            <p className="text-warning">Price: &nbsp; {nft.price}</p>
                                            <p className="text-warning">Description: &nbsp; {nft.description}</p>
                                            <br />
                                            <Button className="btn" style={{ borderRadius: "0px" }}>Buy Now</Button>
                                        </div>
                                    </div>
                                )))}
                        </div>

                    </div>
                </section>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};


export default AddartCollectionss;
