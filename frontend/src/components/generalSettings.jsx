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

  const [generalsettings, setgeneralsettings] = useState({
    language: "",
    company_name: "",
    cpoyright_text: "",
  })
  const [files, setfiles] = useState({
    logo: ""
  })
  const handleChange = (e) => {
    setgeneralsettings({ ...generalsettings, [e.target.name]: e.target.value });
  };

  const handleFiles = (e) => {
    setfiles({ ...files, [e.target.name]: e.target.files[0] });
  };



  // adduser data

  const getcategoryData = async () => {
    try {
      const resp = await axios.get(`${BASE_API_URL}/FetchGeneralsettings`);
      setgeneralsettings(resp.data);
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
    formData.append("language", generalsettings.language);
    formData.append("company_name", generalsettings.company_name);
    formData.append("cpoyright_text", generalsettings.cpoyright_text);
    formData.append("logo", files.logo);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    await axios
      .post(`${BASE_API_URL}/Add-generalsetings`, formData, config)
      .then((data) => {
        console.log(data, "Setting Changes Has Ben Updated Successfully");

        if (data.status === 200) {
          alert("Setting Changes Has Ben Updated Successfully");
          window.location.href = "/admin/general-settings"
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
                <h1 className="m-0">General Settings</h1>
              </div>
            </div>
          </div>
        </div>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <Form className="col-md-12 form-add p-5 shadow-lg rounded my-5">
                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>Language</Form.Label>
                  <Form.Control
                    type="text"
                    name="language"
                    value={generalsettings.language}
                    onChange={handleChange}
                    placeholder="Language"
                  />
                </Form.Group>

                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>Comapny's Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="company_name"
                    value={generalsettings.company_name}
                    onChange={handleChange}
                    placeholder="Comapny's Name"
                  />
                </Form.Group>

                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>Copyright Text</Form.Label>
                  <Form.Control
                    type="text"
                    name="cpoyright_text"
                    value={generalsettings.cpoyright_text}
                    onChange={handleChange}
                    placeholder="Copyright Text"
                  />
                </Form.Group>

                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>Site Logo</Form.Label>
                  <Form.Control
                    type="file"
                    name="logo"
                    onChange={handleFiles}
                    placeholder="Site Logo"
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
AddartCollectionss.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AddartCollectionss);
