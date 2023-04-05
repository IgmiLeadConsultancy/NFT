import React, { useState } from "react";
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
  const [newUser, setNewUser] = useState({
    fname: "",
    lname: "",
    email: "",
    phn: "",
    pass: "",
    role: "",
  });

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fname", newUser.fname);
    formData.append("lname", newUser.lname);
    formData.append("email", newUser.email);
    formData.append("phn", newUser.phn);
    formData.append("pass", newUser.pass);
    formData.append("role", newUser.role);

    const addUserRes = axios({
      method: "post",
      url: `${BASE_API_URL}/userAdding`,
      data: JSON.stringify(newUser),
      headers: { "Content-Type": "application/json" },
    });

    if (addUserRes === true) {
      window.location.href = "/admin/dashboard";
    }
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
              <div className="col-sm-6"></div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <ul className="list-unstyled" align="center">
                <li className="list-inline-item p-2 btn btn-primary">
                  {" "}
                  <i className="fa fa-user d-inline"></i>{" "}
                  <a className="text-dark" href="/admin/users">
                    All Users
                  </a>
                </li>
                <li className="list-inline-item p-2 btn btn-success">
                  {" "}
                  <i className="fa fa-user-plus d-inline"></i>{" "}
                  <a className="text-dark" href="/admin/add-users">
                    Add Users
                  </a>
                </li>
                <li className="list-inline-item p-2 btn btn-warning">
                  {" "}
                  <i className="fa fa-ban d-inline"></i>{" "}
                  <a className="text-dark" href="/admin/suspend-users">
                    Suspended Users
                  </a>
                </li>
              </ul>
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
                <h4>Add User</h4>
                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    style={{
                      background: "aliceblue",
                      color: "black",
                      borderRadius: "22px",
                    }}
                    type="text"
                    name="fname"
                    value={newUser.fname}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="add-users-input"
                  />
                </Form.Group>

                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    style={{
                      background: "aliceblue",
                      color: "black",
                      borderRadius: "22px",
                    }}
                    type="text"
                    name="lname"
                    value={newUser.lname}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="add-users-input"
                  />
                </Form.Group>

                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    style={{
                      background: "aliceblue",
                      color: "black",
                      borderRadius: "22px",
                    }}
                    type="email"
                    name="email"
                    value={newUser.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="add-users-input"
                  />
                </Form.Group>

                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    style={{
                      background: "aliceblue",
                      color: "black",
                      borderRadius: "22px",
                    }}
                    type="number"
                    name="phn"
                    value={newUser.phn}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="add-users-input"
                  />
                </Form.Group>

                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    style={{
                      background: "aliceblue",
                      color: "black",
                      borderRadius: "22px",
                    }}
                    type="text"
                    name="pass"
                    value={newUser.pass}
                    onChange={handleChange}
                    placeholder="Password"
                    className="add-users-input"
                  />
                </Form.Group>

                <Form.Group className="">
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    style={{
                      background: "aliceblue",
                      color: "black",
                      borderRadius: "22px",
                    }}
                    name="role"
                    value={newUser.role}
                    onChange={handleChange}
                    className="add-users-input"
                  >
                    <option value={"-----"}>-----</option>
                    <option value={"Admin"}>Admin</option>
                    <option value={"User"}>User</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group
                  className=""
                  controlId="formBasicEmail"
                  align="center"
                >
                  <Form.Group
                    className=""
                    controlId="formBasicEmail"
                    align="center"
                  >
                    <Button
                      type="submit"
                      className="btn btn-outline-info text-light w-25 form-control shadow-lg "
                    >
                      Add User
                    </Button>
                  </Form.Group>
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
