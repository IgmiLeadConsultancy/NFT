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
  const [FormErr1, setFormErr1] = useState("")
  const [FormErr2, setFormErr2] = useState("")
  const [FormErr3, setFormErr3] = useState("")
  const [FormErr4, setFormErr4] = useState("")
  const [FormErr5, setFormErr5] = useState("")
  const [FormErr6, setFormErr6] = useState("")
  const [collection_title, setartcollection_title] = useState("");
  const [artCollectionss_name, setartCollectionss_name] = useState("");
  const [artCollectionss_short_desc, setartCollectionss_short_desc] = useState("");
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
      const resp = await axios.get(`${BASE_API_URL}/Fetch-Categories`);
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
    if (collection_title === "") {
      setFormErr1("Please Enter Collection Title")
    }
    else if (artCollectionss_name === "") {
      setFormErr2("Please Enter Collection Name")
    }
    else if (artCollectionss_short_desc === "") {
      setFormErr3("Please Write Something About Your Collection")
    }
    else if (artCollectionss_price === "") {
      setFormErr4("Enter The Price Of Your Collection")
    }
    else if (collectionsImg === "") {
      setFormErr5("Please Enter Your Collection Image");
    }
    else {
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
        .post(`${BASE_API_URL}/Add-Arts`, formData, config)
        .then((data) => {
          console.log(data, "Arts Collection Has Added Successfully");
          if (data.status === 200) {
            alert("Arts Collection Has Been Added Successfully");
            window.location.href = "/admin/atrsCollections"
          }
        })
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
                  <input
                    type="text"
                    name="collection_title"
                    onChange={setCollectionsTitle}
                    placeholder="Art Collections Title"
                  />
                </Form.Group>
                <p className="text-danger font-weight-bold">{FormErr1}</p>
                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>Art Collections Name</Form.Label>
                  <input type="text"
                    name="artCollectionss_name"
                    onChange={setCollectionsName}
                    placeholder="Art Collections Name" />
                </Form.Group>
                <p className="text-danger font-weight-bold">{FormErr2}</p>
                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>Art Collections Short Desc</Form.Label>
                  <input
                    type="text"
                    name="artCollectionss_short_desc"
                    onChange={setShortDesc}
                    placeholder="Art Collections Short Desc"
                  />
                </Form.Group>
                <p className="text-danger font-weight-bold">{FormErr3}</p>
                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>Art Collections's Category</Form.Label>
                  <select name="artCollectionss_category"
                    className="form-control"
                    onChange={setCollectionCategory}>
                    <option>---------</option>
                    {categoryData.map((e) => {
                      return (
                        <option key={e.category_name}>{e.category_name}</option>
                      );
                    })}
                  </select>


                </Form.Group>

                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>Art Collections Price</Form.Label>
                  <input type="number"
                    name="artCollectionss_price"
                    onChange={stCollectionPrice}
                    placeholder="Art Collections Price" />
                </Form.Group>
                <p className="text-danger font-weight-bold">{FormErr4}</p>
                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>Art Collections Thumbnail</Form.Label>
                  <input type="file"
                    name="collectionsImg"
                    onChange={setimgfile}
                    placeholder="Art Collections Thumbnail" />
                </Form.Group>
                <p className="text-danger font-weight-bold">{FormErr5}</p>
                <Form.Group
                  className=""
                  controlId="formBasicEmail"
                  align="center"
                >
                  <Button variant="primary" type="submit" onClick={addUserData}>
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
