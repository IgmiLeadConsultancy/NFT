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
const UserManagement = () => {
  //Inserting Form Data


  const [newUser, setNewUser] = useState({
    collection_title: "",
    artCollectionss_name: "",
    artCollectionss_short_desc: "",
    artCollectionss_category: "",
    artCollectionss_price: "",
    collectionsImg: "",
  });

  const handleChange = (e) => {


    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };


  const { id } = useParams();



  const getUserData = async () => {
    try {
      const resp = await axios.get(`${BASE_API_URL}/getarts/${id}`);
      setNewUser(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);



  const [categoryData, setcategoryData] = useState([]);

  const getcategoryData = async () => {
    try {
      const resp = await axios.get(`${BASE_API_URL}/Fetch-Categories`);
      setcategoryData(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getcategoryData();
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("collection_title", newUser.collection_title);
    formData.append("artCollectionss_name", newUser.artCollectionss_name);
    formData.append("artCollectionss_short_desc", newUser.artCollectionss_short_desc);
    formData.append("artCollectionss_category", newUser.artCollectionss_category);
    formData.append("artCollectionss_price", newUser.artCollectionss_price);
    formData.append("collectionsImg", newUser.collectionsImg);

    await axios({
      method: "PATCH",
      url: `${BASE_API_URL}/updateproducts/${id}`,
      data: JSON.stringify(newUser),
      headers: { "Content-Type": "application/json" },
    }).then((data) => {
      console.log(data, "Arts Collection Has Been Updated Successfully");

      if (data.status === 200) {
        alert("Arts Collection Has Been Updated Successfully");
        window.location.href = "/admin/atrsCollections"
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
                  <h1 className="m-0">Edit Products</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a href="#/">Product Management</a>
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
                <h4>Product Edit</h4>
                <Form className="mt-3 shadow-lg bg-light p-5 rounded"
                  onSubmit={handleSubmit}>
                  <Form.Group className="" controlId="formBasicEmail">
                    <Form.Label>Art Collections Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="collection_title"
                      value={newUser.collection_title}
                      onChange={handleChange}
                      placeholder="Art Collections Title"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="" controlId="formBasicEmail">
                    <Form.Label>Art Collections Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="artCollectionss_name"
                      value={newUser.artCollectionss_name}
                      onChange={handleChange}
                      placeholder="Art Collections Name"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="" controlId="formBasicEmail">
                    <Form.Label>Art Collections Short Desc</Form.Label>
                    <Form.Control
                      type="text"
                      name="artCollectionss_short_desc"
                      value={newUser.artCollectionss_short_desc}
                      onChange={handleChange}
                      placeholder="Art Collections Short Desc"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="" controlId="formBasicEmail">
                    <Form.Label>Art Collections's Category</Form.Label>
                    <Form.Select
                      name="artCollectionss_category"
                      value={newUser.artCollectionss_category}
                      className="form-control"
                      onChange={handleChange}
                      required
                    >
                      <option>---------</option>
                      {categoryData.map((e) => {
                        return <option key={e.category_name}>{e.category_name}</option>;
                      })}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="" controlId="formBasicEmail">
                    <Form.Label>Art Collections Price</Form.Label>
                    <Form.Control
                      type="number"
                      name="artCollectionss_price"
                      value={newUser.artCollectionss_price}
                      onChange={handleChange}
                      placeholder="Art Collections Price"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="" controlId="formBasicEmail">
                    <Form.Label>Art Collections Thumbnail</Form.Label>
                    <Form.Control
                      type="file"
                      name="collectionsImg"
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
UserManagement.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(UserManagement);
