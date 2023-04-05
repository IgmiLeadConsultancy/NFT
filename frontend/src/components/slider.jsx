import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import AsideBar from "./common/AsideBar";
// import { Redirect } from "react-router-dom";
import Footer from "./common/Footer";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DataTable from "react-data-table-component";
import { BASE_API_URL } from "../variables";

const AddartCollectionss = () => {

  const [slider_img, setslider_img] = useState("");

  const setimgfile = (e) => {
    setslider_img(e.target.files[0]);
  };


  const addUserData = async (e) => {
    e.preventDefault();

    var formData = new FormData();

    formData.append("slider_img", slider_img);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    await axios
      .post(`${BASE_API_URL}/SLIDERS`, formData, config)
      .then((data) => {
        console.log(data, "Slider Image Has Added Successfully");
        if (data.status === 200) {
          alert("Arts Collection Has Been Added Successfully");
          window.location.href = "/admin/sliders"
        }
      })

  };


  const [categoryData, setcategoryData] = useState([]);

  const getcategoryData = async () => {
    try {
      const resp = await axios.get(`${BASE_API_URL}/slidersData`);
      setcategoryData(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getcategoryData();
  }, []);


  const Collumns = [

    {
      name: "Slider's Images",
      selector: (row) => (
        <img
          width={70}
          height={70}
          src={require(`../uploads/${row.slider_img}`).default}
          alt={"NFT"}
        />
      ),
    },

    {
      name: "Edit",
      cell: (row) => (
        <a href={`/admin/slider-edit/${row._id}`} className="btn btn-success">
          <i className="fa fa-pen"></i>
        </a>
      ),
    },
    {
      name: "Delete",
      cell: (row) => (
        <button
          className="btn btn-danger"
          onClick={() => deletecategory(row._id)}
        >
          <i className="fa fa-times"></i>
        </button>
      ),
    },
  ];



  const deletecategory = async (id) => {
    await axios
      .delete(`${BASE_API_URL}/deletesliders/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        console.log(data, "Slider Image Has Been Deleted Successfully");
        if (data.status === 200) {
          alert(`Slider Image Has Been Deleted Successfully`);
          window.location.href = "/admin/sliders";
          //   setErr(<div className="alert alert-warning alert-dismissible fade show" role="alert">
          //   <strong>Your Wallet Has Been Deleted</strong> 
          //   <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          //     <span aria-hidden="true" ><a className="text-dark" href="/admin/wallet-list">Ok</a></span>
          //   </button>
          // </div>
          // );

        }

      });
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
                <h1 className="m-0">Sliders Settings</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <DataTable
            title="Wallets' Data"
            columns={Collumns}
            data={categoryData}
            pagination
            fixedHeader
            selectableRows
          />
        </div>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <Form className="col-md-12 form-add p-5 shadow-lg rounded my-5" onSubmit={addUserData}>
                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>Sliders Images</Form.Label>
                  <Form.Control
                    type="file"
                    name="slider_img"
                    // value={NftSettings.ShortDescription}
                    onChange={setimgfile}
                    placeholder="Sliders Images"
                  />
                </Form.Group>



                <Form.Group
                  className=""
                  controlId="formBasicEmail"
                  align="center"
                >
                  <Button variant="primary" type="submit">
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
AddartCollectionss.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AddartCollectionss);
