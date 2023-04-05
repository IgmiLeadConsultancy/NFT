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
  const [EmailSettings, setEmailSettings] = useState({
    EmailHost: "",
    EmailPort: "",
    EmailUsername: "",
    EmailPassword: "",
    MailEncryption: "",
    MailFormAddress: "",
  });

  const handleChange = (e) => {
    setEmailSettings({ ...EmailSettings, [e.target.name]: e.target.value });
  };

  const getUserData = async () => {
    try {
      const resp = await axios.get(`${BASE_API_URL}/emailsData`);
      setEmailSettings(resp.data);
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
    formData.append("EmailHost", EmailSettings.EmailHost);
    formData.append("EmailPort", EmailSettings.EmailPort);
    formData.append("EmailUsername", EmailSettings.EmailUsername);
    formData.append("EmailPassword", EmailSettings.EmailPassword);
    formData.append("MailEncryption", EmailSettings.MailEncryption);
    formData.append("MailFormAddress", EmailSettings.MailFormAddress);


    await axios({
      method: "POST",
      url: `${BASE_API_URL}/EMAILS`,
      data: JSON.stringify(EmailSettings),
      headers: { "Content-Type": "application/json" },
    }).then((data) => {
      console.log(data, "Setting Changes Has Ben Updated Successfully");

      if (data.status === 200) {
        alert("Setting Changes Has Ben Updated Successfully");
        window.location.href = "/admin/emails"
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
                <h1 className="m-0">Email Settings</h1>
              </div>
            </div>
          </div>
        </div>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <Form className="col-md-12 form-add p-5 shadow-lg rounded my-5" onSubmit={handleSubmit}>
                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>Email Host</Form.Label>
                  <Form.Control
                    type="text"
                    name="EmailHost"
                    value={EmailSettings.EmailHost}
                    onChange={handleChange}
                    placeholder="Email Host"
                  />
                </Form.Group>

                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>Email Port</Form.Label>
                  <Form.Control
                    type="number"
                    name="EmailPort"
                    value={EmailSettings.EmailPort}
                    onChange={handleChange}
                    placeholder="Email Port"
                  />
                </Form.Group>

                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>Email Username</Form.Label>
                  <Form.Control
                    type="email"
                    name="EmailUsername"
                    value={EmailSettings.EmailUsername}
                    onChange={handleChange}
                    placeholder="Email Username"
                  />
                </Form.Group>

                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>Email Password</Form.Label>
                  <Form.Control
                    type="text"
                    name="EmailPassword"
                    className="form-control"
                    value={EmailSettings.EmailPassword}
                    onChange={handleChange}
                    placeholder="Email Password"
                  >
                  </Form.Control>
                </Form.Group>

                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>Mail Encryption</Form.Label>
                  <Form.Control
                    type="text"
                    name="MailEncryption"
                    value={EmailSettings.MailEncryption}
                    onChange={handleChange}
                    placeholder="Mail Encryption"
                  />
                </Form.Group>

                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>Mail Form Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="MailFormAddress"
                    value={EmailSettings.MailFormAddress}
                    onChange={handleChange}
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
