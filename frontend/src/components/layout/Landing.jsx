import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Author1 from "../../images/author-1.jpg";
import "../../css/landing.css";
import Footer from "../common/Footer";
import Carousel2 from "react-elastic-carousel";
import Item from "./item";
import axios from "axios";
import { BASE_API_URL } from "../../variables";



const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 4 },
  { width: 1200, itemsToShow: 4 },
];


const Landing = ({ isAuthenticated }) => {


  // Dynamic Categories 
  const [categoryData, setcategoryData] = useState([]);

  const getcategoryData = async () => {
    try {
      const resp = await axios.get(`${BASE_API_URL}/Fetch-Categories`);
      setcategoryData(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getcategoryData();
  }, []);


  // Dynamic Art Collections
  const [ProductsData, setProductsData] = useState([]);

  const getProductsData = async () => {
    try {
      const resp = await axios.get(`${BASE_API_URL}/Fetch-Products`);
      setProductsData(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);



  // Dynamic Wallets
  const [WaleetData, setWaleetData] = useState([]);

  const getWaleetData = async () => {
    try {
      const resp = await axios.get(`${BASE_API_URL}/wallets`);
      setWaleetData(resp.data);
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    getWaleetData();
  }, []);

  console.log(WaleetData);

  // Dynamic Currencies
  const [Currency, setCurrency] = useState([]);

  const getCurrency = async () => {
    try {
      const resp = await axios.get(`${BASE_API_URL}/currencies`);
      setCurrency(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrency();
  }, []);


  // Dynamic Sliders Images
  const [Sliders, setSliders] = useState([]);

  const getSliders = async () => {
    try {
      const resp = await axios.get(`${BASE_API_URL}/slidersData`);
      setSliders(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSliders();
  }, []);


  if (isAuthenticated) {
    return <Redirect to="/admin/dashboard" />;
  }
  return (
    <>
      <div className="navNsec m-0">

        <div className="first-para p-5">
          <Container className="my-3 container-fluid">
            <Row style={{ marginTop: "153px" }}>
              <Col>
                <p style={{ color: "#d8ff00" }} className="font-weight-bold">
                  <b>EXCHANGE MY NFT</b>
                </p>
                <h1 className="text-light">
                  Create, sell and collect <br /> digital items.
                </h1>
                <p
                  style={{ color: "#5BA4B6" }}
                  className="my-5 font-weight-bold"
                >
                  <b style={{ color: "rgb(16 192 235)" }}>
                    Unit of data stored on a digital ledger, called a
                    blockchain, that certifies a digital asset to be unique and
                    therefore not interchangeable
                  </b>
                </p>
                <div className="btn-div">
                  <a href="/explore-all" className="w-25 exp" style={{ fontSize: "25px" }}>
                    Explore
                  </a>{" "}
                  <br />
                </div>
              </Col>
              <Col>
                <Carousel2 breakPoints={breakPoints}>
                  {Sliders &&
                    Sliders.map((sliders) => (
                      <Item className="slider-sec">
                        <img
                          className="d-block w-100"
                          src={require(`../../uploads/${sliders.slider_img}`).default}
                          alt="First slide"
                          style={{ borderRadius: "16px" }}
                        />
                      </Item>
                    ))}
                </Carousel2>
              </Col>
            </Row>
          </Container>
        </div>
        <Container className="my-5 second-para">
          <h2
            align="center"
            className="text-light d-flex justify-content-center"
          >
            Browse By Category{" "}
          </h2>
          <br /> <br />
          <Row>
            <Carousel2 breakPoints={breakPoints}>
              {categoryData &&
                categoryData.map((categorydata) => (
                  <Col className="catg" align="center">
                    <a href="/" className="art text-decoration-none">
                      <img src={require(`../../uploads/${categorydata.category_image}`).default} alt="" style={{ width: "80px", borderRadius: "100%" }} />
                      <br />
                      <p className="text-light">{categorydata.category_name}</p>
                    </a>
                  </Col>
                ))}
            </Carousel2>
          </Row>
          <Row></Row>
        </Container>
        <Container className="wallets">
          <Row>
            <h2
              align="center"
              className="text-light d-flex justify-content-center"
            >
              We Support The Following Wallets
            </h2>
            <br />
            {/* <div className="small-border bg-color-2" style={{backgroundSize: 'cover',color:"8364E2"}} /> */}
            <Carousel2 breakPoints={breakPoints}>
              {WaleetData &&
                WaleetData.map((wallets) => (
                  <Col align="center">
                    <div className="wlts">
                      <a href="/" className="art text-decoration-none">
                        <img src={require(`../../uploads/${wallets.wallet_image}`).default} alt={"Meta Mask"} />
                        <p className="text-light">{wallets.wallet_name}</p>
                      </a>
                    </div>
                  </Col>
                ))}
            </Carousel2>
          </Row>
        </Container>
        <Container>
          <Row>
            <h2
              align="center"
              className="text-light my-5 d-flex justify-content-center"
            >
              Supported Crypto Currency
            </h2>
            <br />
            {/* <div className="small-border bg-color-2" style={{backgroundSize: 'cover'}} /> */}

            <Carousel2 breakPoints={breakPoints}>
              {Currency &&
                Currency.map((currencies) => (
                  <Col align="center">
                    <div className="wlts">
                      <a href="/" className="art text-decoration-none">
                        <img src={require(`../../uploads/${currencies.currrency_image}`).default} alt={"Meta Mask"} />
                        <p className="text-light">{currencies.currrency_name}</p>
                      </a>
                    </div>
                  </Col>
                ))}
            </Carousel2>
          </Row>
        </Container>
        <Container className="new-itms">
          <h2 align="" className="text-light my-5">
            New Items
          </h2>
          <div className="App">
            <Carousel2 breakPoints={breakPoints}>
              {ProductsData &&
                ProductsData.map((productsdata) => (
                  <Item>
                    <Col className=" author-sec" style={{ marginTop: "10px" }}>
                      <div className="parent-author" style={{ cursor: "pointer" }}>
                        <a href="/" className="author">
                          <img src={Author1} className="ath1" alt="NFT" />
                        </a>
                      </div>
                      <div align="center" className="card-item p-3 card-item-img">
                        <a href="/">
                          <img
                            className="rounded"
                            src={require(`../../uploads/${productsdata.collectionsImg}`).default}
                            height={"230px"}
                            alt="NFT"
                          />
                        </a>
                        <p className="text-light d-flex my-2">{productsdata.collection_title}</p>
                        <div className="d-flex bid">
                          <p className="d-inline" style={{ color: "#8affff" }}>
                            {productsdata.artCollectionss_price}ETH{" "}
                          </p>
                          <span className="text-light">1/20</span>
                        </div>
                        <div className="d-flex bid">
                          <p className="d-inline" style={{ color: "#8affff" }}>
                            <a href="/" className="btn" style={{ color: "#8affff", borderRadius: "0px" }}>Buy Now</a>
                          </p>
                          <span className="text-light">
                            <i className="fa fa-heart"></i>
                          </span>
                        </div>
                      </div>
                    </Col>
                  </Item>
                ))}
            </Carousel2>
          </div>
        </Container>
        <Container className="new-itms">
          <h2 align="" className="text-light my-5">
            Hot Collections
          </h2>
          <div className="App">
            <Carousel2 breakPoints={breakPoints}>
              {ProductsData &&
                ProductsData.map((productsdata) => (
                  <Item>
                    <Col className=" author-sec" style={{ marginTop: "10px" }}>
                      <div className="parent-author" style={{ cursor: "pointer" }}>
                        <a href="/" className="author">
                          <img src={Author1} className="ath1" alt="NFT" />
                        </a>
                      </div>
                      <div align="center" className="card-item p-3 card-item-img">
                        <a href="/">
                          <img
                            className="rounded"
                            src={require(`../../uploads/${productsdata.collectionsImg}`).default}
                            height={"230px"}
                            alt="NFT"
                          />
                        </a>
                        <p className="text-light d-flex my-2">{productsdata.collection_title}</p>
                        <div className="d-flex bid">
                          <p className="d-inline" style={{ color: "#8affff" }}>
                            {productsdata.artCollectionss_price}ETH{" "}
                          </p>
                          <span className="text-light">1/20</span>
                        </div>
                        <div className="d-flex bid">
                          <p className="d-inline" style={{ color: "#8affff" }}>
                            <a href="/" className="btn" style={{ color: "#8affff", borderRadius: "0px" }}>Buy Now</a>
                          </p>
                          <span className="text-light">
                            <i className="fa fa-heart"></i>
                          </span>
                        </div>
                      </div>
                    </Col>
                  </Item>
                ))}
            </Carousel2>
          </div>
        </Container>
        <Container>
          <Row>
            <h2 className="text-light">Top Sellers</h2>
            <Col className="col-md-3">
              <p className="m-0" style={{ color: "#77F6F0" }}>
                1.
              </p>
              <div className="sellers d-flex">
                <img
                  src={Author1}
                  className="ath m-0"
                  style={{ marginLeft: "68px" }}
                  alt="NFT"
                />
                <div className="mx-2">
                  <p className="m-0" style={{ color: "#FFF" }}>
                    Monica Lucas
                  </p>
                  <p className="m-0" style={{ color: "#77F6F0" }}>
                    3.2 ETH
                  </p>
                </div>
              </div>
            </Col>

            <Col className="col-md-3">
              <p className="m-0" style={{ color: "#77F6F0" }}>
                1.
              </p>
              <div className="sellers d-flex">
                <img
                  src={Author1}
                  className="ath m-0"
                  style={{ marginLeft: "68px" }}
                  alt="NFT"
                />
                <div className="mx-2">
                  <p className="m-0" style={{ color: "#FFF" }}>
                    Monica Lucas
                  </p>
                  <p className="m-0" style={{ color: "#77F6F0" }}>
                    3.2 ETH
                  </p>
                </div>
              </div>
            </Col>
            <Col className="col-md-3">
              <p className="m-0" style={{ color: "#77F6F0" }}>
                1.
              </p>
              <div className="sellers d-flex">
                <img
                  src={Author1}
                  className="ath m-0"
                  style={{ marginLeft: "68px" }}
                  alt="NFT"
                />
                <div className="mx-2">
                  <p className="m-0" style={{ color: "#FFF" }}>
                    Monica Lucas
                  </p>
                  <p className="m-0" style={{ color: "#77F6F0" }}>
                    3.2 ETH
                  </p>
                </div>
              </div>
            </Col>
            <Col className="col-md-3">
              <p className="m-0" style={{ color: "#77F6F0" }}>
                1.
              </p>
              <div className="sellers d-flex">
                <img
                  src={Author1}
                  className="ath m-0"
                  style={{ marginLeft: "68px" }}
                  alt="NFT"
                />
                <div className="mx-2">
                  <p className="m-0" style={{ color: "#FFF" }}>
                    Monica Lucas
                  </p>
                  <p className="m-0" style={{ color: "#77F6F0" }}>
                    3.2 ETH
                  </p>
                </div>
              </div>
            </Col>
            <Col className="col-md-3">
              <p className="m-0" style={{ color: "#77F6F0" }}>
                1.
              </p>
              <div className="sellers d-flex">
                <img
                  src={Author1}
                  className="ath m-0"
                  style={{ marginLeft: "68px" }}
                  alt="NFT"
                />
                <div className="mx-2">
                  <p className="m-0" style={{ color: "#FFF" }}>
                    Monica Lucas
                  </p>
                  <p className="m-0" style={{ color: "#77F6F0" }}>
                    3.2 ETH
                  </p>
                </div>
              </div>
            </Col>
            <Col className="col-md-3">
              <p className="m-0" style={{ color: "#77F6F0" }}>
                1.
              </p>
              <div className="sellers d-flex">
                <img
                  src={Author1}
                  className="ath m-0"
                  style={{ marginLeft: "68px" }}
                  alt="NFT"
                />
                <div className="mx-2">
                  <p className="m-0" style={{ color: "#FFF" }}>
                    Monica Lucas
                  </p>
                  <p className="m-0" style={{ color: "#77F6F0" }}>
                    3.2 ETH
                  </p>
                </div>
              </div>
            </Col>
            <Col className="col-md-3">
              <p className="m-0" style={{ color: "#77F6F0" }}>
                1.
              </p>
              <div className="sellers d-flex">
                <img
                  src={Author1}
                  className="ath m-0"
                  style={{ marginLeft: "68px" }}
                  alt="NFT"
                />
                <div className="mx-2">
                  <p className="m-0" style={{ color: "#FFF" }}>
                    Monica Lucas
                  </p>
                  <p className="m-0" style={{ color: "#77F6F0" }}>
                    3.2 ETH
                  </p>
                </div>
              </div>
            </Col>
            <Col className="col-md-3">
              <p className="m-0" style={{ color: "#77F6F0" }}>
                1.
              </p>
              <div className="sellers d-flex">
                <img
                  src={Author1}
                  className="ath m-0"
                  style={{ marginLeft: "68px" }}
                  alt="NFT"
                />
                <div className="mx-2">
                  <p className="m-0" style={{ color: "#FFF" }}>
                    Monica Lucas
                  </p>
                  <p className="m-0" style={{ color: "#77F6F0" }}>
                    3.2 ETH
                  </p>
                </div>
              </div>
            </Col>
            <Col className="col-md-3">
              <p className="m-0" style={{ color: "#77F6F0" }}>
                1.
              </p>
              <div className="sellers d-flex">
                <img
                  src={Author1}
                  className="ath m-0"
                  style={{ marginLeft: "68px" }}
                  alt="NFT"
                />
                <div className="mx-2">
                  <p className="m-0" style={{ color: "#FFF" }}>
                    Monica Lucas
                  </p>
                  <p className="m-0" style={{ color: "#77F6F0" }}>
                    3.2 ETH
                  </p>
                </div>
              </div>
            </Col>
            <Col className="col-md-3">
              <p className="m-0" style={{ color: "#77F6F0" }}>
                1.
              </p>
              <div className="sellers d-flex">
                <img
                  src={Author1}
                  className="ath m-0"
                  style={{ marginLeft: "68px" }}
                  alt="NFT"
                />
                <div className="mx-2">
                  <p className="m-0" style={{ color: "#FFF" }}>
                    Monica Lucas
                  </p>
                  <p className="m-0" style={{ color: "#77F6F0" }}>
                    3.2 ETH
                  </p>
                </div>
              </div>
            </Col>
            <Col className="col-md-3">
              <p className="m-0" style={{ color: "#77F6F0" }}>
                1.
              </p>
              <div className="sellers d-flex">
                <img
                  src={Author1}
                  className="ath m-0"
                  style={{ marginLeft: "68px" }}
                  alt="NFT"
                />
                <div className="mx-2">
                  <p className="m-0" style={{ color: "#FFF" }}>
                    Monica Lucas
                  </p>
                  <p className="m-0" style={{ color: "#77F6F0" }}>
                    3.2 ETH
                  </p>
                </div>
              </div>
            </Col>
            <Col className="col-md-3">
              <p className="m-0" style={{ color: "#77F6F0" }}>
                1.
              </p>
              <div className="sellers d-flex">
                <img
                  src={Author1}
                  className="ath m-0"
                  style={{ marginLeft: "68px" }}
                  alt="NFT"
                />
                <div className="mx-2">
                  <p className="m-0" style={{ color: "#FFF" }}>
                    Monica Lucas
                  </p>
                  <p className="m-0" style={{ color: "#77F6F0" }}>
                    3.2 ETH
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Container className="my-5">
          <h2 className="text-light">Create and Sell Now</h2>
          <div className="row" style={{ backgroundSize: "cover" }}>
            <a href="https://metamask.io/"
              className="btn cns col-lg-4 col-md-6 mb-sm-30"
              style={{ backgroundSize: "cover", borderRadius: "0px", border: "none" }}
            >
              <a href="/Add-Own-NFT"
                className="feature-box f-boxed style-3"
                style={{ backgroundSize: "cover" }}
              >
                <i
                  className="icon-cns fa fa-wallet wow fadeInUp bg-color-2 text-dark i-boxed icon_wallet animated"
                  style={{ visibility: "visible", animationName: "fadeInUp" }}
                />
                <div className="text" style={{ backgroundSize: "cover" }}>
                  <h4
                    className="wow fadeInUp animated"
                    style={{
                      visibility: "visible",
                      animationName: "fadeInUp",
                      color: "whitesmoke",
                    }}
                  >
                    Setup your wallet
                  </h4>
                  <p
                    className="wow fadeInUp animated"
                    data-wow-delay=".25s"
                    style={{
                      visibility: "visible",
                      animationDelay: "0.25s",
                      animationName: "fadeInUp",

                      color: "#8AFFFF",
                    }}
                  >
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem.
                  </p>
                </div>
              </a>
            </a>
            <a href="/Add-Own-NFT"

              className="btn cns col-lg-4 col-md-6 mb-sm-30"
              style={{ backgroundSize: "cover", borderRadius: "0px", border: "none" }}
            >
              <div

                className="feature-box f-boxed style-3"
                style={{ backgroundSize: "cover" }}
              >
                <i
                  className="icon-cns fa fa-upload wow fadeInUp bg-color-2 text-dark i-boxed icon_cloud-upload_alt animated"
                  style={{ visibility: "visible", animationName: "fadeInUp" }}
                />
                <div className="text" style={{ backgroundSize: "cover" }}>
                  <h4
                    className="wow fadeInUp animated"
                    style={{
                      visibility: "visible",
                      animationName: "fadeInUp",
                      color: "whitesmoke",
                    }}
                  >

                    Mint your NFT's

                  </h4>
                  <p
                    className="wow fadeInUp animated"
                    data-wow-delay=".25s"
                    style={{
                      visibility: "visible",
                      animationDelay: "0.25s",
                      animationName: "fadeInUp",
                      color: "#8AFFFF",
                    }}
                  >
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem.
                  </p>
                </div>
              </div>
            </a>
            <a href="/Sell-Own-NFT"
              className="btn cns col-lg-4 col-md-6 mb-sm-30"
              style={{ backgroundSize: "cover", borderRadius: "0px", border: "none" }}
            >
              <div
                className="feature-box f-boxed style-3"
                style={{ backgroundSize: "cover" }}
              >
                <i
                  className="icon-cns fa fa-sellsy wow fadeInUp bg-color-2 i-boxed icon_tags_alt animated"
                  style={{ visibility: "visible", animationName: "fadeInUp" }}
                />
                <div className="text" style={{ backgroundSize: "cover" }}>
                  <h4
                    className="wow fadeInUp animated"
                    style={{
                      visibility: "visible",
                      animationName: "fadeInUp",
                      color: "whitesmoke",
                    }}
                  >
                    Sell your NFT's
                  </h4>
                  <p
                    className="wow fadeInUp animated"
                    data-wow-delay=".25s"
                    style={{
                      visibility: "visible",
                      animationDelay: "0.25s",
                      animationName: "fadeInUp",
                      color: "#8AFFFF",
                    }}
                  >
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem.
                  </p>
                </div>
              </div>
            </a>
          </div>
        </Container>

        <Footer />
      </div>
    </>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
