import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import AsideBar from "./common/AsideBar";
// import { Redirect } from "react-router-dom";
import Footer from "./common/Footer";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { BASE_API_URL } from "../variables";

const AddartCollectionss = () => {
  const [NftSettings, setNftSettings] = useState({
    MoralisServerURL: "",
    MoralisApplicationID: "",
    ContractAddress: "",
    AdminAddress: "",
    Fee: "",
    Chain: "",
    ExplorerURL: "",
  });

  const handleChange = (e) => {
    setNftSettings({ ...NftSettings, [e.target.name]: e.target.value });
  };

  const getUserData = async () => {
    try {
      const resp = await axios.get(`${BASE_API_URL}/NftsData`);
      setNftSettings(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("MoralisServerURL", NftSettings.MoralisServerURL);
    formData.append("MoralisApplicationID", NftSettings.MoralisApplicationID);
    formData.append("ContractAddress", NftSettings.ContractAddress);
    formData.append("AdminAddress", NftSettings.AdminAddress);
    formData.append("Fee", NftSettings.Fee);
    formData.append("Chain", NftSettings.Chain);
    formData.append("ExplorerURL", NftSettings.ExplorerURL);

    await axios({
      method: "POST",
      url: `${BASE_API_URL}/NFTS`,
      data: JSON.stringify(NftSettings),
      headers: { "Content-Type": "application/json" },
    }).then((data) => {
      console.log(data, "Setting Changes Has Ben Updated Successfully");

      if (data.status === 200) {
        alert("Setting Changes Has Ben Updated Successfully");
        window.location.href = "/admin/nfts"
      }
    })
  };



  return (
    <div className="wrapper">
      <div>

      </div>
      <div>
        <AsideBar />
      </div>
      <div className="content-wrapper">

        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">NFT Settings</h1>
              </div>
            </div>
          </div>
        </div>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <Form className="mt-3 col-md-12 form-add p-5 shadow-lg rounded my-5" onSubmit={handleSubmit}>
                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>Moralis Server URL</Form.Label>
                  <Form.Control
                    type="text"
                    name="MoralisServerURL"
                    value={NftSettings.MoralisServerURL}
                    onChange={handleChange}
                    placeholder="Moralis Server URL"
                  />
                </Form.Group>

                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>Moralis Application ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="MoralisApplicationID"
                    value={NftSettings.MoralisApplicationID}
                    onChange={handleChange}
                    placeholder="Moralis Application ID"
                  />
                </Form.Group>

                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>Contract Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="ContractAddress"
                    value={NftSettings.ContractAddress}
                    onChange={handleChange}
                    placeholder="Contract Address"
                  />
                </Form.Group>

                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>Admin Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="AdminAddress"
                    className="form-control"
                    value={NftSettings.AdminAddress}
                    onChange={handleChange}
                    placeholder="Admin Address"
                  >
                  </Form.Control>
                </Form.Group>

                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>Fee (Percentage)</Form.Label>
                  <Form.Control
                    type="number"
                    name="Fee"
                    value={NftSettings.Fee}
                    onChange={handleChange}
                    placeholder="Fee (Percentage)"
                  />
                </Form.Group>

                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>Chain</Form.Label>
                  <Form.Control
                    type="text"
                    name="Chain"
                    value={NftSettings.Chain}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>Explorer URL</Form.Label>
                  <Form.Control
                    type="text"
                    name="ExplorerURL"
                    value={NftSettings.ExplorerURL}
                    onChange={handleChange}
                    placeholder="Explorer URL"
                  />
                </Form.Group>

                <Form.Group
                  className=""
                  controlId="formBasicEmail"
                  align="center"
                >
                  <Button variant="primary" type="submit">
                    Update
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
AddartCollectionss.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AddartCollectionss);
