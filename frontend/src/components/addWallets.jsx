import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import icon from "../img/user.png";
import { } from "../actions/auth";
import axios from "axios";
import AsideBar from "./common/AsideBar";
import Footer from "./common/Footer";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { BASE_API_URL } from "../variables";
const Addwallet = () => {
  // const [err,setErr]=useState("")


  const [wallet_name, setwallet_name] = useState("");
  const [file, setFile] = useState("");

  // const history = useHistory();

  const setwalletname = (e) => {
    const { value } = e.target;
    setwallet_name(value);

  };



  const setimgfile = (e) => {
    setFile(e.target.files[0]);
  };

  // adduser data

  const addUserData = async (e) => {
    e.preventDefault();

    var formData = new FormData();
    formData.append("wallet_name", wallet_name);
    formData.append("wallet_image", file);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    await axios.post(
      `${BASE_API_URL}/Add-Wallets`,
      formData,
      config
    ).then((data) => {
      console.log(data, "wallet Added")
      if (data.status === 200) {
        alert(`Wallet Has Been Listed Successfully`);
        window.location.href = "/admin/wallet-list"
        //   setErr(<div className="alert alert-warning alert-dismissible fade show" role="alert">
        //   <strong>Your Wallet Has Been Deleted</strong> 
        //   <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        //     <span aria-hidden="true" ><a className="text-dark" href="/admin/wallet-list">Ok</a></span>
        //   </button>
        // </div>
        // )
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
                <h1 className="m-0">Add wallet</h1>
              </div>
            </div>
          </div>
        </div>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="err">
                {/* {err} */}
              </div>
              <Form className="col-md-12 form-add p-5 shadow-lg rounded my-5">
                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>wallet Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="wallet_name"
                    onChange={setwalletname}
                    placeholder="wallet Name"
                  />
                </Form.Group>

                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>wallet Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="wallet_image"
                    onChange={setimgfile}
                    placeholder="wallet Image"
                  />
                </Form.Group>



                <Form.Group
                  className=""
                  controlId="formBasicEmail"
                  align="center"
                >
                  <Button variant="primary" type="submit" onClick={addUserData}>
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
Addwallet.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Addwallet);
