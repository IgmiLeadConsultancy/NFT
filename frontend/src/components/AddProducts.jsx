import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import AsideBar from "./common/AsideBar";
// import { Redirect } from "react-router-dom";
import Footer from "./common/Footer";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const AddartCollectionss = () => {
  const [collection_title, setartcollection_title] = useState("");
  const [artCollectionss_name, setartCollectionss_name] = useState("");
  const [artCollectionss_short_desc, setartCollectionss_short_desc] =
    useState("");
  const [artCollectionss_category, setartCollectionss_category] = useState("");
  const [artCollectionss_price, setartCollectionss_price] = useState("");
  const [collectionsImg, setcollectionsImg] = useState("");

  // const history = useHistory();

  const setCollectionsTitle = (e) => {
    const { value } = e.target;
    setartcollection_title(value);
  };

  const setCollectionsName = (e) => {
    const { value } = e.target;
    setartCollectionss_name(value);
  };

  const setShortDesc = (e) => {
    const { value } = e.target;
    setartCollectionss_short_desc(value);
  };

  const setCollectionCategory = (e) => {
    const { value } = e.target;
    setartCollectionss_category(value);
  };

  const stCollectionPrice = (e) => {
    const { value } = e.target;
    setartCollectionss_price(value);
  };

  const setimgfile = (e) => {
    setcollectionsImg(e.target.files[0]);
  };

  // adduser data

  const [categoryData, setcategoryData] = useState([]);

  const getcategoryData = async () => {
    try {
      const resp = await axios.get("http://localhost:5000/Fetch-Categories");
      setcategoryData(resp.data);
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
    formData.append("collection_title", collection_title);
    formData.append("artCollectionss_name", artCollectionss_name);
    formData.append("artCollectionss_short_desc", artCollectionss_short_desc);
    formData.append("artCollectionss_category", artCollectionss_category);
    formData.append("artCollectionss_price", artCollectionss_price);
    formData.append("collectionsImg", collectionsImg);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    await axios
      .post("http://localhost:5000/Add-Arts", formData, config)
      .then((data) => {console.log(data,"Arts Collection Has Added Successfully");
       if(data.status === 200){
        alert("Arts Collection Has Been Added Successfully");
        window.location.href="/admin/atrsCollections"
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
                <h1 className="m-0">Add Art Collections</h1>
              </div>
            </div>
          </div>
        </div>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <Form className="col-md-12 form-add p-5 shadow-lg rounded my-5">
                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>Art Collections Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="collection_title"
                    onChange={setCollectionsTitle}
                    placeholder="Art Collections Title"
                  />
                </Form.Group>

                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>Art Collections Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="artCollectionss_name"
                    onChange={setCollectionsName}
                    placeholder="Art Collections Name"
                  />
                </Form.Group>

                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>Art Collections Short Desc</Form.Label>
                  <Form.Control
                    type="text"
                    name="artCollectionss_short_desc"
                    onChange={setShortDesc}
                    placeholder="Art Collections Short Desc"
                  />
                </Form.Group>

                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>Art Collections's Category</Form.Label>
                  <Form.Select
                    name="artCollectionss_category"
                    className="form-control"
                    onChange={setCollectionCategory}
                  >
                    <option>---------</option>
                    {categoryData.map((e) => {
                      return (
                        <option key={e.category_name}>{e.category_name}</option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>Art Collections Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="artCollectionss_price"
                    onChange={stCollectionPrice}
                    placeholder="Art Collections Price"
                  />
                </Form.Group>

                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>Art Collections Thumbnail</Form.Label>
                  <Form.Control
                    type="file"
                    name="collectionsImg"
                    onChange={setimgfile}
                    placeholder="Art Collections Thumbnail"
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
