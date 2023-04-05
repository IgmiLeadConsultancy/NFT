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
    slider_image: "",
  });

  const handleChange = (e) => {


    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };


  const { id } = useParams();




  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("slider_image", newUser.slider_image);

    await axios({
      method: "PATCH",
      url: `${BASE_API_URL}/updateSliders/${id}`,
      data: JSON.stringify(newUser),
      headers: { "Content-Type": "application/json" },
    }).then((data) => {
      console.log(data, "Slider Image Has Been Updated Successfully");

      if (data.status === 200) {
        alert("Slider Image Has Been Updated Successfully");
        window.location.href = "/admin/sliders"
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
                  <h1 className="m-0">Edit Your slider</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a href="#/">Slider  Edit</a>
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
                <h4>Slider Edit</h4>
                <Form className="mt-3 shadow-lg bg-light p-5 rounded"
                  onSubmit={handleSubmit}>
                  <Form.Group className="" controlId="formBasicEmail">
                    <Form.Label>Slider Image</Form.Label>
                    <Form.Control
                      type="file"
                      name="slider_img"
                      // value={NftSettings.ShortDescription}
                      onChange={handleChange}
                      placeholder="Sliders Images"
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
