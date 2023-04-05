import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AsideBar from "./common/AsideBar";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import { BASE_API_URL } from "../variables";

const UserManagement = () => {
  //Inserting Form Data



  const [newUser, setNewUser] = useState({
    category_name: "",
    category_title: "",
    category_desc: "",
  });

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };



  const { id } = useParams();

  const getUserData = async () => {
    try {
      const resp = await axios.get(`${BASE_API_URL}/getcategory/${id}`);
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
    formData.append("category_name", newUser.category_name);
    formData.append("category_title", newUser.category_title);
    formData.append("category_desc", newUser.category_desc);

    await axios({
      method: "patch",
      url: `${BASE_API_URL}/updateCategories/${id}`,
      data: JSON.stringify(newUser),
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => {
        console.log(data, "Category Updated")
        if (data.status === 200) {
          alert(`Category Has Been Updated Successfully`);
          window.location.href = "/admin/category-list";
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
                  <h1 className="m-0">Category Update</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a href="#/">Category Management</a>
                    </li>
                    <li className="breadcrumb-item active">Category Update</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div></div>
          <section className="content">

          </section>
          <div className="container">
            <div className="row">
              <div className="col-md-12 p-5">
                <Form
                  className="mt-3 shadow-lg bg-light p-5 rounded"
                  onSubmit={handleSubmit}
                >
                  <h4>Add User</h4>
                  <Form.Group className="" controlId="formBasicEmail">
                    <Form.Label>Category Name</Form.Label>
                    <Form.Control
                      style={{
                        background: "aliceblue",
                        color: "black",
                        borderRadius: "22px",
                      }}
                      type="text"
                      name="category_name"
                      value={newUser.category_name}
                      onChange={handleChange}
                      placeholder="Category Name"
                      className="add-Category-input"
                    />
                  </Form.Group>

                  <Form.Group className="" controlId="formBasicEmail">
                    <Form.Label>Category Title</Form.Label>
                    <Form.Control
                      style={{
                        background: "aliceblue",
                        color: "black",
                        borderRadius: "22px",
                      }}
                      type="text"
                      name="category_title"
                      value={newUser.category_title}
                      onChange={handleChange}
                      placeholder="Category Title"
                      className="add-Category-input"
                    />
                  </Form.Group>

                  <Form.Group className="" controlId="formBasicEmail">
                    <Form.Label>Category Descriptions</Form.Label>
                    <Form.Control
                      style={{
                        background: "aliceblue",
                        color: "black",
                        borderRadius: "22px",
                      }}
                      type="text"
                      name="category_desc"
                      value={newUser.category_desc}
                      onChange={handleChange}
                      placeholder="Category Descriptions"
                      className="add-Category-input"
                    />
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
                        className="btn btn-outline-info text-light w-25 form-control shadow-lg text-light"
                      >
                        Update
                      </Button>
                    </Form.Group>
                  </Form.Group>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <footer />
      </div>
    </div>
  );
};
UserManagement.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(UserManagement);
