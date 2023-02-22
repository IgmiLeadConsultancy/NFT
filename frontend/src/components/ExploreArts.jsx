import React, { useState, useEffect } from "react";

import axios from "axios";
// import { Redirect } from "react-router-dom";
import Footer from "./common/Footer";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import ethers from "ethers";
import { Redirect } from "react-router-dom";




const AddartCollectionss = () => {



    const [allArts, setallArts] = useState([]);

    const getallArts = async () => {
        try {
            const resp = await axios.get("http://localhost:5000/Fetch-All-Users-Arts");
            setallArts(resp.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getallArts();
    }, []);








    const IsLoggedIn = window.localStorage.getItem("userLoggedIn");
    if (IsLoggedIn !== "true") {

        return <Redirect to="/user/login" />;
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
                            <div className="col-sm-12" align="center">
                                <h1 className="m-0 text-light">Explore Arts Collections</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="content">
                    <div className="container">
                        <div className="row">
                                {allArts &&
                                    allArts.map((allarts) => (
                                        <div className="col-md-4 all-arts" align="center">
                                            <div className="img">
                                                <img src={require(`../uploads/${allarts.collectionsImg}`).default} alt="" style={{ width: "300px", height: "400px" }} />
                                            </div>
                                            <br />
                                            <div className="info text-light" align="center">
                                                <p className="text-warning">Name: &nbsp; {allarts.artCollectionss_name}</p>
                                                <p className="text-warning">Price: &nbsp; {allarts.artCollectionss_price}</p>
                                                <p className="text-warning">Artist: &nbsp; {allarts.user}</p>
                                                <br />
                                                <a href="/" className="btn" style={{ borderRadius: "0px" }}>Buy Now</a>
                                            </div>
                                        </div>
                                    ))}
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
