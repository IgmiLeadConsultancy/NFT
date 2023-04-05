import React, { useState, useEffect } from "react";

import axios from "axios";
// import { Redirect } from "react-router-dom";
import Footer from "./common/Footer";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import ethers from "ethers";
import { Redirect } from "react-router-dom";
import { BASE_API_URL } from "../variables";


import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js';
import { web3storageToken, MintAddressMumbai, MarketAddressMumbai, BscMarketAddress, BscMintAddress } from "../config/constants";

import Mint from "../config/Mint.json";
import Marketplace from "../config/Marketplace.json";
import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";

import Web3Modal from "web3modal"

const AddartCollectionss = () => {

    const [FormErr, setFormErr] = useState("")
    const [FormErr2, setFormErr2] = useState("")
    const [FormErr3, setFormErr3] = useState("")
    const [FormErr4, setFormErr4] = useState("")
    const [FormErr5, setFormErr5] = useState("")
    const [MintingErrors, setMintingErrors] = useState("");

    const [collection_title, setartcollection_title] = useState("");
    const [artCollectionss_name, setartCollectionss_name] = useState("");
    const [artCollectionss_short_desc, setartCollectionss_short_desc] = useState("");
    const [artCollectionss_category, setartCollectionss_category] = useState("");
    const [artCollectionss_price, setartCollectionss_price] = useState("");
    const [collectionsImg, setcollectionsImg] = useState([]);
    const [collectionImgUrl, setCollectionImgUrl] = useState("");
    const [user, setuser] = useState("");

    const [showMIntingSuccessMsg, setshowMIntingSuccessMsg] = useState("")
    let ShowMintingErrs = undefined;
    let ShowMintingSuccessMsg2 = undefined;

    const [nftcontract, getNft] = useState([])
    const [market, getMarket] = useState([])

    // const [fileUrl, setFileUrl] = useState("");

    // const history = useHistory();


    useEffect(() => {
        setNft();
    }, [getNft, getMarket])


    const setCollectionsTitle = (e) => {
        const { value } = e.target;
        setartcollection_title(value);
    };

    const setCollectionsName = (e) => {
        const { value } = e.target;
        setartCollectionss_name(value);
    };

    const setShortDesc = (e) => {
        const { value } = e.target;
        setartCollectionss_short_desc(value);
    };

    const setCollectionCategory = (e) => {
        const { value } = e.target;
        setartCollectionss_category(value);
    };

    const stCollectionPrice = (e) => {
        const { value } = e.target;
        setartCollectionss_price(value);
    };


    const setimgfile = (e) => {
        setcollectionsImg(e.target.files);
        console.log(e.target.files);
    };

    const setUsername = (e) => {
        const { value } = e.target;
        setuser(value);
    };


    // adduser data

    const [categoryData, setcategoryData] = useState([]);

    const getcategoryData = async () => {
        try {
            const resp = await axios.get(`${BASE_API_URL}/Fetch-Categories`);
            setcategoryData(resp.data);
        } catch (error) {
            console.log(error);
        }
    };

    // async function onChange() {
    //     const file = collectionsImg
    //     try {
    //         const added = await client.add(
    //             file,
    //             {
    //                 progress: (prog) => console.log(`received: ${prog}`)
    //             }
    //         )
    //         const url = `https://ipfs.infura.io/ipfs/${added.path}`
    //         setFileUrl(url)
    //     } catch (error) {
    //         console.log('Error uploading file: ', error)
    //     }
    // }

    useEffect(() => {
        getcategoryData();
    }, []);

    const addUserData = async (e) => {
        e.preventDefault();


        if (collection_title === "") {
            setFormErr('Please Enter Collection Title')
        }
        else if (artCollectionss_name === "") {
            setFormErr2('Please Enter Collection Name')
        }
        else if (artCollectionss_short_desc === "") {
            setFormErr3('Please Enter Collections Short Descriptions');
        }
        else if (artCollectionss_price === "") {
            setFormErr4('Please Enter Colllections Price');
        }
        else if (collectionsImg === "") {
            setFormErr5("Please Insert Your Collection Image")
        }
        else {
            var formData = new FormData();
            formData.append("collection_title", collection_title);
            formData.append("artCollectionss_name", artCollectionss_name);
            formData.append("artCollectionss_short_desc", artCollectionss_short_desc);
            formData.append("artCollectionss_category", artCollectionss_category);
            formData.append("artCollectionss_price", artCollectionss_price);
            formData.append("collectionsImg", collectionsImg);
            formData.append("user", user);

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            };

            await axios
                .post(`${BASE_API_URL}/Add-Own-NFT`, formData, config)
                .then((data) => {
                    console.log(data, "Arts Collection Has Added Successfully");
                    if (data.status === 200) {
                        alert("Your Art Collection Has Been Created Successfully");
                        // window.location.href = "/Add-Own-NFT"
                    }
                })


        }

    };


    //Getting Username


    const getUsername = () => {
        fetch(`${BASE_API_URL}/userData`, {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                token: window.localStorage.getItem("loggedIn"),
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                JSON.stringify(data)
                console.log(data, "userData");
                setuser(data.data.email);
            });
    }



    useEffect(() => {
        getUsername();
    }, []);





    const IsLoggedIn = window.localStorage.getItem("userLoggedIn");
    if (IsLoggedIn !== "true") {

        return <Redirect to="/user/login" />;
    }


    async function setNft() {
        const web3Modal = new Web3Modal()
        await web3Modal.connect();
        var goe = "0x5";
        var mm = "0x13881";
        var bsct = "0x61";
        const connected = await detectEthereumProvider();
        if (connected.chainId == goe) {
            //var nftcontract = gonft
        }
        else if (connected.chainId == mm) {
            var nftcontract = MintAddressMumbai
        }
        else if (connected.chainId == bsct) {
            var nftcontract = BscMintAddress
        }
        getNft(nftcontract);
        console.log(nftcontract)
        setMarket();
    }

    async function setMarket() {
        const web3Modal = new Web3Modal()
        await web3Modal.connect();
        var goe = "0x5";
        var mm = "0x13881";
        var bsct = "0x61";
        const connected = await detectEthereumProvider();
        if (connected.chainId == goe) {
            //var market = goemarket
        }
        else if (connected.chainId == mm) {
            var market = MarketAddressMumbai
        }
        else if (connected.chainId == bsct) {
            var market = BscMarketAddress
        }
        getMarket(market);
        console.log(market)
    }


    function getAccessToken() {
        return web3storageToken;
    }

    function makeStorageClient() {
        return new Web3Storage({ token: getAccessToken() })
    }

    async function storeFiles(e) {
        e.preventDefault();
        const client = makeStorageClient();

        const cid = await client.put(collectionsImg);
        console.log(cid);
        const name = collectionsImg[0].name;
        console.log(name);
        const url = `ipfs://${cid}/${name}`;
        setCollectionImgUrl(url);
        console.log(url);
        console.log('Stored image with url:', collectionImgUrl);
    }

    const addNFT = async (e) => {
        storeFiles(e);
        const obj = {
            name: artCollectionss_name,
            description: artCollectionss_short_desc,
            image: collectionImgUrl
        };
        const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' });
        const files = [
            new File([blob], 'metadata.json')
        ]

        const client = makeStorageClient();
        const Cid = await client.put(files);
        const url = `ipfs://${Cid}/metadata.json`;
        createNFT(url);
        console.log('Stored metadata with url: ', url);
    }


    const createNFT = async (url) => {
        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            let contract = new ethers.Contract(nftcontract, Mint.abi, signer);

            let transaction = await contract.createNFT(url);
            let tx = await transaction.wait();
            console.log(tx);
            let event = tx.events[0];
            let value = event.args[2];
            let tokenId = value.toNumber();
            console.log(tokenId);
            const price = ethers.utils.parseUnits(artCollectionss_price, 'ether');
            console.log(price);

            contract = new ethers.Contract(market, Marketplace.abi, signer);
            let listingFee = await contract.getListingFee();
            listingFee = listingFee.toString();
            transaction = await contract.createVaultItem(nftcontract, tokenId, price, { value: listingFee });
            await transaction.wait();
            console.log(transaction);
            setshowMIntingSuccessMsg(transaction)
        } catch (error) {
            // console.log(error);
            setMintingErrors(error)
        }
    }

    if (MintingErrors.code === 'ACTION_REJECTED') {

        ShowMintingErrs = <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Opps!</strong> You Have Rejected Your Own Minting.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

    }

    // else{
    //     ShowMintingErrs = <div class="alert alert-danger alert-dismissible fade show" role="alert">
    //         Your Nft Has Been Minted .
    //         <br />
    //         Do You Want To List It ? &nbsp;
    //         <button className="btn btn success">Yes</button>
    //         <button className="btn btn danger">No</button>
    //         <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    //             <span aria-hidden="true">&times;</span>
    //         </button>
    //     </div>

    // }

    if (showMIntingSuccessMsg) {

        ShowMintingSuccessMsg2 = <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Hurray!</strong> Your Nft Has Been Listed.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

    }



    //  else
    //  {
    //     window.location.href="" 
    //  }



    return (
        <div className="wrapper">

            <div>

            </div>
            <div className="">

                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0 text-light">Add Art Collections</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {ShowMintingErrs}
                            {ShowMintingSuccessMsg2}
                        </div>
                    </div>
                </div>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <Form className="col-md-12 form-add p-5 shadow-lg rounded my-5">
                                <Form.Group className="" controlId="formBasicEmail">
                                    <Form.Label className="text-light">Art Collections Title</Form.Label>
                                    <input
                                        required
                                        type="text"
                                        name="collection_title"
                                        id="collection_title"
                                        onChange={setCollectionsTitle}
                                        placeholder="Art Collections Title"
                                        className="form-control" />
                                </Form.Group>
                                <p className="text-danger font-weight-bold">{FormErr}</p>

                                <Form.Group className="" controlId="formBasicEmail">
                                    <Form.Label className="text-light">Art Collections Name</Form.Label>
                                    <input
                                        required
                                        type="text"
                                        name="artCollectionss_name"
                                        onChange={setCollectionsName}
                                        placeholder="Art Collections Name"
                                        className="form-control"
                                    />
                                </Form.Group>
                                <p className="text-danger font-weight-bold">{FormErr2}</p>
                                <Form.Group className="" controlId="formBasicEmail">
                                    <Form.Label className="text-light">Art Collections Short Desc</Form.Label>
                                    <input type="text"
                                        name="artCollectionss_short_desc"
                                        onChange={setShortDesc}
                                        placeholder="Art Collections Short Desc"
                                        required
                                        className="form-control"
                                    />
                                </Form.Group>
                                <p className="text-danger font-weight-bold">{FormErr3}</p>
                                <Form.Group className="" controlId="formBasicEmail">
                                    <Form.Label className="text-light">Art Collections's Category</Form.Label>
                                    <select
                                        name="artCollectionss_category"
                                        className="form-control"
                                        onChange={setCollectionCategory}

                                    >
                                        <option>---------</option>
                                        {categoryData.map((e) => {
                                            return (
                                                <option key={e.category_name}>{e.category_name}</option>
                                            );
                                        })}
                                        <option>Others</option>
                                    </select>
                                </Form.Group>

                                <Form.Group className="" controlId="formBasicEmail">
                                    <Form.Label className="text-light">Art Collections Price</Form.Label>
                                    <input type="number"
                                        name="artCollectionss_price"
                                        onChange={stCollectionPrice}
                                        placeholder="Art Collections Price"
                                        required

                                        className="form-control"
                                    />
                                </Form.Group>
                                <p className="text-danger font-weight-bold">{FormErr4}</p>
                                <Form.Group className="" controlId="formBasicEmail">
                                    <Form.Label className="text-light">Art Collections Thumbnail</Form.Label>
                                    <input type="file"
                                        name="collectionsImg"
                                        onChange={setimgfile}
                                        placeholder="Art Collections Thumbnail"
                                        required
                                        className="form-control"
                                    />
                                </Form.Group>
                                <p className="text-danger font-weight-bold">{FormErr5}</p>

                                <Form.Group className="" controlId="formBasicEmail">
                                    <input type="hidden"
                                        name="user"
                                        onChange={setUsername}
                                        value={user}
                                        placeholder="Art Collections Thumbnail"

                                        className="form-control"
                                    />
                                </Form.Group>


                                <Form.Group
                                    className=""
                                    controlId="formBasicEmail"
                                    align="center"
                                >
                                    <Button variant="primary" type="submit" onClick={addNFT}>
                                        Add
                                    </Button>
                                </Form.Group>
                            </Form>
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
