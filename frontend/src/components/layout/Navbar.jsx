import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { } from "../../actions/auth";
// import Logo from "../../images/logo.png";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { BASE_API_URL } from "../../variables";

import ConnectChain from "../ConnectChain";

const NavbaR = ({ auth: { isAuthenticated, loading, user }, logout, currentAccount, connectWallet }) => {


  const [Logo, setLogo] = useState("")

  const fetchLogo = async () => {
    try {
      const resp = await axios.get(`${BASE_API_URL}/FetchGeneralsettings`);
      setLogo(resp.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchLogo();
  }, []);


  let img = undefined;
  // let cmp_name = undefined;
  // let copyright=undefined;


  {
    Logo &&
      Logo.map((cd) => (

        img = require(`../../uploads/${cd.logo}`).default
        // cmp_name = cd.company_name,
        // copyright=cd.cpoyright_text
      ));
  }


  const [userData, setuserData] = useState("")
  const fetchUserData = () => {

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
        console.log(data, "userData");
        setuserData(data.data);
      });
  }


  useEffect(() => {
    fetchUserData()
  }, [])


  console.log(userData.fname);



  function calcTime(city, offset) {
    var b = new Date()
    var utc = b.getTime() + (b.getTimezoneOffset() * 60000);
    var nd = new Date(utc + (3600000 * offset));
    return nd.getHours();

  }



  var showime = (calcTime('Los Angeles', '-8'));




  const IsLoggedIn = window.localStorage.getItem("userLoggedIn");

  logout = () => {
    window.localStorage.clear();
    window.location.href = "/";
  };

  const authLinks = (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light sticky-top">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link"
            data-widget="pushmenu"
            href="#/"
            role="button"
          >
            <i className="fas fa-bars" />
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="index3.html" className="nav-link">
            Home
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block"></li>
      </ul>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a
            className="nav-link"
            data-widget="navbar-search"
            href="#/"
            role="button"
          >
            <i className="fas fa-search" />
          </a>
          <div className="navbar-search-block">
            <form className="form-inline">
              <div className="input-group input-group-sm">
                <input
                  className="form-control form-control-navbar"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <div className="input-group-append">
                  <button className="btn btn-navbar" type="submit">
                    <i className="fas fa-search" />
                  </button>
                  <button
                    className="btn btn-navbar"
                    type="button"
                    data-widget="navbar-search"
                  >
                    <i className="fas fa-times" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </li>

        <li className="nav-item dropdown">
          <a className="nav-link" data-toggle="dropdown" href="#/">
            <i className="fa fa-user" />
          </a>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <div style={{ marginTop: "", textAlign: "center" }}>
              <h5>Welcome, {user && user.name}</h5>
              <h5 className="text-dark text-center font-weight-bold">
                {(() => {
                  if (showime >= 3 && showime < 12) {
                    return <div> Good Morning <i className="fa fa-sun text-warning"></i></div>;
                  } else if (showime >= 12 && showime < 18) {
                    return <div> Good Afternoon <i className="fa fa-sun text-warning "></i> </div>;
                  }

                  else if (showime >= 18 && showime < 23) {
                    return <div> Good Evening <i className="fa fa-moon text-dark"></i></div>;
                  }

                  else {
                    return <div> Good Evening <i className="fa fa-moon text-dark"></i></div>;

                  }

                })()}
              </h5>
              <Link to="/admin/dashboard">
                <i className="fas fa-user"></i>{" "}
                <span className="hide-sm">Dashboard</span>
              </Link>
              <br />
              <Link onClick={logout} to="/" replace>
                <i className="fa fa-arrow-right"></i>{" "}
                <span className="hide-sm">Logout</span>
              </Link>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
  const guestLinks = (
    <>
      <Navbar expand="lg" className="w-100">
        <Container fluid>
          <Navbar.Brand href="#">
            <h1 align="center">
              <a href="/">
                <img src={img} alt="NFT" />
              </a>
            </h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            <input
              type="search"
              className="search-items d-inline"
              placeholder="Search Items Here...."
            />{" "}
            &nbsp;&nbsp;
            <div className="dropdown d-inline">
              <Button
                className="m-0 text-dark"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                style={{ background: "#d8ff00", color: "black" }}
              >
                <i className="fa fa-bars" style={{ color: "black" }}></i>
              </Button>{" "}
              &nbsp;
              <div
                class="dropdown-menu p-3 shadow-lg"
                aria-labelledby="dropdownMenuButton"
                style={{ borderRadius: "100% !important" }}
              >

                <a href="/Add-Own-NFT">Mint Your Nfts</a>
                <br />
                <a href="/Sell-Own-NFT">Sell Your Nfts</a>

              </div>
            </div>



            <Button
              href="/"
              className="m-0 text-dark d-inline"
              style={{ background: "#d8ff00", color: "black" }}
            >
              <i className="fa fa-wallet" style={{ color: "black" }}></i>
            </Button>{" "}
            &nbsp;&nbsp;
            <Button
              href="/"
              className="m-0 text-dark d-inline"
              style={{ background: "#d8ff00", color: "black" }}
            >
              <i className="fa fa-shopping-cart" style={{ color: "black" }}></i>
            </Button>{" "}
            &nbsp;
            {(() => {
              if (IsLoggedIn === "true") {
                return <Button
                  onClick={logout}
                  className="m-0 text-dark d-inline"
                  style={{ background: "#d8ff00", color: "black" }}
                >
                  <i class="fa fa-sign-out" aria-hidden="true" style={{ color: "black" }}></i>

                </Button>;
              }

            })()}
            &nbsp;
            {(() => {
              if (IsLoggedIn === "true") {
                return <Button
                  href="/user/dashboard"
                  className="m-0 text-dark d-inline"
                  style={{ background: "#d8ff00", color: "black", borderRadius: "0px" }}
                >
                  Dashboard

                </Button>;
              }
              else {
                return <Button
                  href="/user/login"
                  className="m-0 text-dark d-inline"
                  style={{ background: "#d8ff00", color: "black" }}
                >
                  <i className="fa fa-user" style={{ color: "black" }}></i>
                </Button>;

              }

            })()}
            {" "}




            {/* <Button
              className="btn text-dark d-inline"

              style={{ background: "yellow" }}
            >
              {currentAccount !== null ?
                userData.fname + " " + userData.lname
                :
                <Button className="btn text-dark d-inline" style={{ background: "yellow", border: "none" }} onClick={connectWallet}>Connect Wallet</Button>}
            </Button>{" "} */}
            {currentAccount !== null ?
              <ConnectChain />
              :
              <Button className="btn text-dark d-inline" style={{ background: "yellow", border: "none", padding: "10px", paddingLeft: "5px", paddingRight: "5px" }} onClick={connectWallet}>Connect Wallet</Button>
            }
            {" "}


          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );

  return (
    <>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(NavbaR);
