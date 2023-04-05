import React, { useState, useEffect } from "react";

import axios from "axios";
// import { Redirect } from "react-router-dom";
import Footer from "./common/Footer";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Redirect } from "react-router-dom";

import { MarketAddressMumbai, BscMarketAddress, BscMintAddress, MintAddressMumbai } from "../config/constants";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import detectEthereumProvider from "@metamask/detect-provider";


import Mint from "../config/Mint.json";
import Marketplace from "../config/Marketplace.json";



const AddartCollectionss = () => {



    const [SellingErrs, setSellingErrs] = useState("")

    let SellingErrs2 = undefined;

    const [SellingSuccess, setSellingSuccess] = useState("")

    let SellingSuccess2 = undefined;
    const [collection_title, setartcollection_title] = useState("");
    const [artCollectionss_name, setartCollectionss_name] = useState("");
    const [artCollectionss_short_desc, setartCollectionss_short_desc] = useState("");
    const [artCollectionss_category, setartCollectionss_category] = useState("");
    const [artCollectionss_price, setartCollectionss_price] = useState("");
    const [collectionsImg, setcollectionsImg] = useState("");
    const [user, setuser] = useState("");
    const [contractAddress, setcontractAddress] = useState("");
    const [tokenID, settokenID] = useState("");

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
        setcollectionsImg(e.target.files[0]);
    };

    const setUsername = (e) => {
        const { value } = e.target;
        setuser(value);
    };

    const SetContractAddress = (e) => {
        const { value } = e.target;
        setcontractAddress(value);
    };

    const SettokenID = (e) => {
        const { value } = e.target;
        settokenID(value);
    };

    // adduser data

    const [categoryData, setcategoryData] = useState([]);

    const getcategoryData = async () => {
        try {
            const resp = await axios.get("http://localhost:5000/Fetch-Categories");
            setcategoryData(resp.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getcategoryData();
    }, []);

    const addUserData = async (e) => {
        e.preventDefault();

        var formData = new FormData();
        formData.append("collection_title", collection_title);
        formData.append("artCollectionss_name", artCollectionss_name);
        formData.append("artCollectionss_short_desc", artCollectionss_short_desc);
        formData.append("artCollectionss_category", artCollectionss_category);
        formData.append("artCollectionss_price", artCollectionss_price);
        formData.append("collectionsImg", collectionsImg);
        formData.append("user", user);
        formData.append("contractAddress", contractAddress);
        formData.append("tokenID", tokenID);

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };

        await axios
            .post("http://localhost:5000/Sell-Own-NFT", formData, config)
            .then((data) => {
                console.log(data, "Arts Collection Has Added Successfully");
                if (data.status === 200) {
                    alert("Your Art Collection Has Been Created Successfully");
                    // window.location.href = "/Sell-Own-NFT"
                }
            })


    };


    //Getting Username


    const getUsername = () => {
        fetch("http://localhost:5000/userData", {
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


    const uploadNFT = async (e) => {
        e.preventDefault();
        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();

            let contract = new ethers.Contract(nftcontract, Mint.abi, signer);

            let cid = await contract.tokenURI(tokenID);
            if (!cid) return;

            let transaction = await contract.approve(market, tokenID);

            const price = ethers.utils.parseUnits(artCollectionss_price, 'ether');

            contract = new ethers.Contract(market, Marketplace.abi, signer);
            let listingFee = await contract.getListingFee();
            listingFee = listingFee.toString();
            transaction = await contract.createVaultItem(nftcontract, tokenID, price, { value: listingFee });
            await transaction.wait();
            setSellingSuccess(transaction);

        } catch (error) {
            setSellingErrs(error);
        }
    }

    if (SellingErrs.code === "UNSUPPORTED_OPERATION") {

        SellingErrs2 = <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Opps!</strong> Network Does Not Suport ENS. Please Put Your Contract Address and Token Id Correctly
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

    }

    else if (SellingErrs.code === 'ACTION_REJECTED') {
        SellingErrs2 = <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Opps!</strong> You Have Rejected Your Own Listing
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    }

    if (SellingSuccess) {
        SellingSuccess2 = <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Hurray!</strong> Your Nft Has Been Listed
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    }

    //  else
    //  {
    //     window.location.href="" 
    //  }


    console.log(SellingErrs);
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
                            {SellingErrs2}
                            {SellingSuccess2}
                        </div>
                    </div>
                </div>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <Form className="col-md-12 form-add p-5 shadow-lg rounded my-5">
                                <Form.Group className="" controlId="formBasicEmail">
                                    <Form.Label className="text-light">Art Collections Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="collection_title"
                                        onChange={setCollectionsTitle}
                                        placeholder="Art Collections Title"
                                    />
                                </Form.Group>





                                <Form.Group className="" controlId="formBasicEmail">
                                    <Form.Label className="text-light">Art Collections's Category</Form.Label>
                                    <Form.Select
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
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="" controlId="formBasicEmail">
                                    <Form.Label className="text-light">Art Collections Price</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="artCollectionss_price"
                                        onChange={stCollectionPrice}
                                        placeholder="Art Collections Price"
                                    />
                                </Form.Group>




                                <Form.Group className="" controlId="formBasicEmail">
                                    <Form.Control
                                        type="hidden"
                                        name="user"
                                        onChange={setUsername}
                                        value={user}

                                    />
                                </Form.Group>

                                <Form.Group className="" controlId="formBasicEmail">
                                    <Form.Label className="text-light">Contract Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="contractAddress"
                                        onChange={SetContractAddress}
                                        placeholder="Contract Address"
                                    />
                                </Form.Group>

                                <Form.Group className="" controlId="formBasicEmail">
                                    <Form.Label className="text-light">Token ID</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="tokenID"
                                        onChange={SettokenID}
                                        placeholder="Token ID"
                                    />
                                </Form.Group>

                                <Form.Group
                                    className=""
                                    controlId="formBasicEmail"
                                    align="center"
                                >
                                    <Button variant="primary" type="submit" onClick={uploadNFT}>
                                        Submit
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
