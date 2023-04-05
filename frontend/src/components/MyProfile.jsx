import React, { useState, useEffect } from "react";
import Footer from "./common/Footer";
import AsideBar from "./common/Asidebar2";
import { BASE_API_URL } from "../variables";
// import DataTable from "react-data-table-component";
import { useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';

function MyProfile() {

    const [userData, setuserData] = useState("");
    const [fns, setfns] = useState("")

    const GetUserDetails = () => {
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
                setfns(data.data.fname.slice(0, 1) + data.data.lname.slice(0, 1))
            });
    }

    // console.log(userData);

    useEffect(() => {
        GetUserDetails()
    }, [])


    const logout = () => {
        window.localStorage.clear();
        window.location.href = "/";
    };


    const { email } = useParams();
    console.log(email);

    return (
        <div>

            <div>
                <div className="wrapper">
                    <div>
                        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a
                                        className="nav-link"
                                        data-widget="pushmenu"
                                        href="#/"
                                        role="button"
                                    >
                                        <i className="fas fa-bars" />
                                    </a>
                                </li>
                                <li className="nav-item d-none d-sm-inline-block">
                                    <a href="/" className="nav-link">
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

                                            <h5 className="text-dark text-center font-weight-bold">
                                                {" "}
                                                Welcome, <span>{userData.fname}</span> 👋 &nbsp;
                                                <button className="btn  btn-info" onClick={logout}>
                                                    Logout <i className="fa fa-sign-out"></i>
                                                </button>
                                            </h5>

                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div>
                        < AsideBar />
                    </div>
                    <div className="content-wrapper">
                        <div className="content-header">
                            <div className="container-fluid">
                                <div className="row mb-2">
                                    <div className="col-sm-6"></div>
                                </div>
                            </div>
                        </div>
                        <section className="content">
                            <div className="container-fluid">
                                <div className="row d-flex justify-content-center">


                                    <div className="col-md-12 d-flex justify-content-center" align="center">
                                        <div className="user-info">
                                            <h2 className="font-weight-bold text-dark bg-info p-3 d-inline" style={{ fontSize: "42px", borderRadius: "100%" }} >{fns}</h2>
                                            <a href="/" className="font-weight-bold p-2 d-inline" style={{ position: "absolute", right: "473px", top: "-16px" }}><i className="fa fa-pencil" style={{ fontSize: "23px" }}></i></a>
                                        </div>
                                    </div>

                                    <div className="col-md-5 p-5">
                                        <Card className="bg-primary text-dark" style={{ width: '100%' }}>
                                            <Card.Body>
                                                <Card.Title>Personal Info</Card.Title>
                                                <Card.Text>
                                                    <h2 className="font-weight-bold">Personal Info</h2>
                                                    <hr className="bg-dark" />
                                                    <span className="font-weight-bold">Name:</span> <span>{(userData.fname) + " " + userData.lname}</span>
                                                    <br />
                                                    <span className="font-weight-bold">Mail Id:</span> <span>{(userData.email)}</span>
                                                    {/* <br />
                                                    <span className="font-weight-bold">Country:</span> <span>{(userData.country_name)}</span> */}
                                                    <br />
                                                    <span className="font-weight-bold">Status:</span> <span>{(userData.status)}</span>
                                                    <br />
                                                    <span className="font-weight-bold">User Since:</span> <span>{(Date(userData.createdAt))}</span>
                                                </Card.Text>

                                            </Card.Body>
                                        </Card>


                                    </div>

                                    <div className="col-md-5 p-5">
                                        <Card className="bg-warning text-dark" style={{ width: '100%' }}>
                                            <Card.Body>
                                                <Card.Title>Order Info</Card.Title>
                                                <Card.Text>
                                                    <h2 className="font-weight-bold">Order Info</h2>
                                                    <hr className="bg-dark" />
                                                    <span className="font-weight-bold ">Total Arts:</span> <span>{(userData.fname) + " " + userData.lname}</span>
                                                    <br />

                                                    <span className="font-weight-bold ">Total Buys:</span> <span>{(userData.country_name)}</span>
                                                    <br />
                                                    <span className="font-weight-bold ">Total Bid:</span> <span>{(userData.status)}</span>
                                                    <br />
                                                    <span className="font-weight-bold ">User Since:</span> <span>{(Date(userData.createdAt))}</span>
                                                </Card.Text>

                                            </Card.Body>
                                        </Card>
                                    </div>


                                </div>
                            </div>
                        </section>
                    </div>
                    <div>
                        <Footer />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MyProfile