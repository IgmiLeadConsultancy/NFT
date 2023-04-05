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
const AddCategory = () => {


  const [category_name, setcategory_name] = useState("");
  const [category_title, setcategory_title] = useState("");
  const [category_desc, setcategory_desc] = useState("");


  const [file, setFile] = useState("");

  // const history = useHistory();

  const setcategoryname = (e) => {
    const { value } = e.target;
    setcategory_name(value);

  };


  const setcategorytitle = (e) => {
    const { value } = e.target;
    setcategory_title(value);
  };

  const setcategorydesc = (e) => {
    const { value } = e.target;
    setcategory_desc(value);
  };


  const setimgfile = (e) => {
    setFile(e.target.files[0]);
  };

  // adduser data

  const addUserData = async (e) => {
    e.preventDefault();

    var formData = new FormData();
    formData.append("category_name", category_name);
    formData.append("category_image", file);
    formData.append("category_title", category_title);
    formData.append("category_desc", category_desc);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    await axios.post(
      `${BASE_API_URL}/Add-Categories`,
      formData,
      config
    ).then((data) => {
      console.log(data, "Category Added")
      if (data.status === 200) {
        alert(`Category Has Been Added Successfully`);
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
      <div className="content-wrapper">

        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Add Category</h1>
              </div>
            </div>
          </div>
        </div>
        <section className="content">
          <div className="container-fluid">
            <div className="row">

              <Form className="col-md-12 form-add p-5 shadow-lg rounded my-5">
                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>Category Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="category_name"
                    onChange={setcategoryname}
                    placeholder="Category Name"
                  />
                </Form.Group>

                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>Category Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="category_image"
                    onChange={setimgfile}
                    placeholder="Category Image"
                  />
                </Form.Group>

                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>Category Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="category_title"
                    onChange={setcategorytitle}
                    placeholder="Category Title"
                  />
                </Form.Group>

                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>Category Descriptions</Form.Label>
                  <Form.Control
                    type="text"
                    name="category_desc"
                    onChange={setcategorydesc}
                    placeholder="Category Description"
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
AddCategory.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AddCategory);
