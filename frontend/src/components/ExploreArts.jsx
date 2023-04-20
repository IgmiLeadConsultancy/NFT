import React, { useState, useEffect } from "react";
import { ethers } from 'ethers';
import axios from "axios";

// import { Redirect } from "react-router-dom";
import Footer from "./common/Footer";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Redirect } from "react-router-dom";

import { cipherHH, mainnet, simpleCrypto, cipherEth, MarketAddressMumbai, web3storageToken } from "../config/constants";
import DemoMint from "../config/DemoMint.json";
import Market from "../config/Marketplace.json";
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js';
import Web3Modal from "web3modal";

import { BASE_API_URL } from "../variables";


const AddartCollectionss = ({ currentAccount }) => {



    // const [allArts, setallArts] = useState([]);

    // const getallArts = async () => {
    //     try {
    //         const resp = await axios.get(`${BASE_API_URL}/Fetch-All-Users-Arts`);
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
    const [tokenId, settokenId] = useState([]);
    const [price, setprice] = useState([]);
    const [image, setImage] = useState([]);
    // const [nftData, setNftData] = useState([]);
    let nftData = []
    console.log(nftData);
    // useEffect(() => {
    //     // connectUser();
    //     getAllNFTs();
    // }, [nfts])




    function getAccessToken() {
        return web3storageToken;
    }

    function makeStorageClient() {
        return new Web3Storage({ token: getAccessToken() })
    }


    useEffect(() => {
        getAllNFTs();
    }, [])




    async function getAllNFTs() {
        const key = simpleCrypto.decrypt(cipherEth);
        const provider = new ethers.providers.JsonRpcProvider(mainnet);
        const wallet = new ethers.Wallet(key, provider);
        const signer = wallet.provider.getSigner(wallet.address);
        const contract = new ethers.Contract(MarketAddressMumbai, Market.abi, signer);
        let itemArray = [];
        itemArray = await contract.getAvailableNft();
        // const data = await contract.getAvailableNft();


        console.log(itemArray);



        itemArray.map(async i => {
            const tokenContractAddress = i.nftContract;
            const tokenContract = new ethers.Contract(tokenContractAddress, DemoMint.abi, signer);

            console.log(i.tokenId);

            let id = i.tokenId
            let tokenUri = (await tokenContract.tokenURI(id)).replace('ipfs://', 'https://ipfs.io/ipfs/');
            // let fetchNftsData = await axios.get(tokenUri);
            // let arrayRes = Object.entries(fetchNftsData).map(([key, value]) => ({ value }));
            // setNftData(arrayRes)
            try {
                let fetchNftsData = await axios.get(tokenUri);
                // setNftData(fetchNftsData.data);
                nftData.push(fetchNftsData.data);
                for (let i = 0; i < nftData.length - 1; i++) {
                    console.log(nftData);
                }
            } catch (error) {
                console.log(error);
            }
        })

        setLoadingState('loaded');

    }





    // nftData.map((e) => (console.log(e.value.name)))



    const IsLoggedIn = window.localStorage.getItem("userLoggedIn");
    if (IsLoggedIn !== "true") {
        return <Redirect to="/user/login" />;
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
                                <h1 className="m-0 text-light">Explore Art Collections</h1>
                            </div>
                            {/* <div className="mt-5">
                                <Button className="m-0 bg-blue text-light" onClick={getAllNFTs} >
                                    Refresh to see new new collection
                                </Button>
                            </div> */}
                        </div>
                    </div>
                </div>
                <section className="content">
                    <div className="container">
                        <div className="row">
                            {/* {nftData &&
                                nftData.map((nft) => (
                                    <div className="col-md-4 all-arts" align="center">
                                        <div className="img">
                                            <img src={nft.value.image} alt="" style={{ width: "300px", height: "400px" }} />
                                        </div>
                                        <br />
                                        <div className="info text-light" align="center">
                                            <p className="text-warning">Name: &nbsp; {nft.value.name}</p>
                                            <p className="text-warning">Token Id: &nbsp; {tokenId}</p>
                                            <p className="text-warning">Price: &nbsp; {price}</p>
                                            <p className="text-warning">Description: &nbsp; {nft.value.description}</p>
                                            <br />
                                            <Button className="btn" style={{ borderRadius: "0px" }} >Buy Now</Button>
                                        </div>
                                    </div>
                                ))} */}
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
