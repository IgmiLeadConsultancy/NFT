import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AsideBar from "./common/AsideBar";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import Footer from "./common/Footer";
import { BASE_API_URL } from "../variables";
const ProductEdit = () => {
  //Inserting Form Data


  const [newUser, setNewUser] = useState({
    wallet_name: "",
    wallet_image: "",
  });

  const handleChange = (e) => {


    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };


  const { id } = useParams();



  const getUserData = async () => {
    try {
      const resp = await axios.get(`${BASE_API_URL}/getWallets/${id}`);
      setNewUser(resp.data);
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
    formData.append("wallet_name", newUser.wallet_name);
    formData.append("wallet_image", newUser.wallet_image);

    await axios({
      method: "PATCH",
      url: `${BASE_API_URL}/updatewallets/${id}`,
      data: JSON.stringify(newUser),
      headers: { "Content-Type": "application/json" },
    }).then((data) => {
      console.log(data, "Wallet Has Been Updated Successfully");

      if (data.status === 200) {
        alert("Wallet Has Been Updated Successfully");
        window.location.href = "/admin/wallet-list"
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
      <div>
        <div className="content-wrapper">

          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0">Edit Your Wallet</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a href="#/">Wallet  Edit</a>
                    </li>
                    <li className="breadcrumb-item active">Edit Products</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div></div>

          <div className="container">
            <div className="row">
              <div className="col-md-12 p-5">
                <h4>Wallet Edit</h4>
                <Form className="mt-3 shadow-lg bg-light p-5 rounded"
                  onSubmit={handleSubmit}>
                  <Form.Group className="" controlId="formBasicEmail">
                    <Form.Label>Art Collections Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="wallet_name"
                      value={newUser.wallet_name}
                      onChange={handleChange}
                      placeholder="Art Collections Title"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="" controlId="formBasicEmail">
                    <Form.Label>Art Collections Thumbnail</Form.Label>
                    <Form.Control
                      type="file"
                      name="wallet_image"
                      onChange={(e) => e.target.files[0]}
                      placeholder="Art Collections Thumbnail"
                      required
                    />
                  </Form.Group>

                  <Form.Group
                    className=""
                    controlId="formBasicEmail"
                    align="center"
                  >
                    <Button className="btn btn-outline-info text-light" variant="primary" type="submit">
                      Update
                    </Button>
                  </Form.Group>
                </Form>


              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};
ProductEdit.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ProductEdit);
