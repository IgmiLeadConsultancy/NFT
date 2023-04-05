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
    TitleFp: "",
    ContentFp: "",
    TitleLts: "",
    ContentLts: "",
    TitleExp: "",
    ContentExp: "",
    TitleFooter: "",
    ContentFooter: "",
  });

  const handleChange = (e) => {
    setNftSettings({ ...NftSettings, [e.target.name]: e.target.value });
  };

  const getUserData = async () => {
    try {
      const resp = await axios.get(`${BASE_API_URL}/contentsData`);
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
    formData.append("TitleFp", NftSettings.TitleFp);
    formData.append("ContentFp", NftSettings.ContentFp);
    formData.append("TitleLts", NftSettings.TitleLts);
    formData.append("ContentLts", NftSettings.ContentLts);
    formData.append("TitleExp", NftSettings.TitleExp);
    formData.append("ContentExp", NftSettings.ContentExp);
    formData.append("TitleFooter", NftSettings.TitleFooter);
    formData.append("ContentFooter", NftSettings.ContentFooter);

    await axios({
      method: "POST",
      url: `${BASE_API_URL}/CONTENTS`,
      data: JSON.stringify(NftSettings),
      headers: { "Content-Type": "application/json" },
    }).then((data) => {
      console.log(data, "Setting Changes Has Ben Updated Successfully");

      if (data.status === 200) {
        alert("Setting Changes Has Ben Updated Successfully");
        window.location.href = "/admin/contents"
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
                <h1 className="m-0">Content Settings</h1>
              </div>
            </div>
          </div>
        </div>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <Form
                className="col-md-12 form-add p-5 shadow-lg rounded my-5"
                onSubmit={handleSubmit}
              >
                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>Title (Famous Promo)</Form.Label>
                  <Form.Control
                    type="text"
                    name="TitleFp"
                    value={NftSettings.TitleExp}
                    onChange={handleChange}
                    placeholder="Title (Famous Promo)"
                  />
                </Form.Group>

                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>Content (Famous Promo) </Form.Label>
                  <Form.Control
                    type="text"
                    name="ContentFp"
                    value={NftSettings.ContentFp}
                    onChange={handleChange}
                    placeholder="Content (Famous Promo) "
                  />
                </Form.Group>

                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>Title (Latest) </Form.Label>
                  <Form.Control
                    type="text"
                    name="TitleLts"
                    value={NftSettings.TitleLts}
                    onChange={handleChange}
                    placeholder="Title (Latest) "
                  />
                </Form.Group>

                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>Content (Latest)</Form.Label>
                  <Form.Control
                    type="text"
                    name="ContentLts"
                    value={NftSettings.ContentLts}
                    onChange={handleChange}
                    placeholder="Content (Latest)"
                  />
                </Form.Group>

                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>Title (Explorer)</Form.Label>
                  <Form.Control
                    type="text"
                    name="TitleExp"
                    value={NftSettings.TitleExp}
                    onChange={handleChange}
                    placeholder="Title (Explorer)"
                  />
                </Form.Group>

                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>Content (Explorer)</Form.Label>
                  <Form.Control
                    type="text"
                    name="ContentExp"
                    value={NftSettings.ContentExp}
                    onChange={handleChange}
                    placeholder="Content (Explorer)"
                  />
                </Form.Group>

                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>Title (Footer)</Form.Label>
                  <Form.Control
                    type="text"
                    name="TitleFooter"
                    value={NftSettings.TitleFooter}
                    onChange={handleChange}
                    placeholder="Title (Footer)"
                  />
                </Form.Group>

                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>Content (Footer)</Form.Label>
                  <Form.Control
                    type="text"
                    name="ContentFooter"
                    value={NftSettings.ContentFooter}
                    onChange={handleChange}
                    placeholder="Content (Footer)"
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
