import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AsideBar from "./common/AsideBar";
import axios from "axios";
import { useParams } from "react-router-dom";
// import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Footer from "./common/Footer";
import { BASE_API_URL } from "../variables";

const UserManagement = () => {


  const [productsData, setProductsData] = useState([]);

  // console.log(productsData);

  const { id } = useParams();
  //    console.log(id);

  const getUserData = async () => {
    try {
      const resp = await axios.get(`${BASE_API_URL}/getarts/${id}`);
      setProductsData(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

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
                  <h1 className="m-0">Product Details</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a href="#/">Product Management</a>
                    </li>
                    <li className="breadcrumb-item active">Product Details</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <section className="content">
            <div className="container-fluid p-5">
              <div className="row">
                <h4 align="center">Product Details</h4>
                <div className="col-md-12" align="center">
                  <Card style={{ width: "50rem", borderRadius: "21px" }}>
                    <Card.Body align="center" style={{ padding: "54px" }}>
                      <Card.Title>
                        <i className="fa fa-square text-info" /> Collection
                        Title:&nbsp; <b>{productsData.collection_title}</b>{" "}
                      </Card.Title>{" "}
                      <br />
                      <br />
                      <Card.Title>
                        <i
                          class="fa fa-square text-info"
                          aria-hidden="true"
                        ></i>{" "}
                        Collection Name:&nbsp;{" "}
                        <b>{productsData.artCollectionss_name}</b>{" "}
                      </Card.Title>{" "}
                      <br />
                      <br />
                      <Card.Title>
                        <i className="fa fa-square text-info" />{" "}
                        Descriptions:&nbsp;{" "}
                        <b>{productsData.artCollectionss_short_desc}</b>{" "}
                      </Card.Title>{" "}
                      <br />
                      <br />
                      <Card.Title>
                        <i
                          class="fa fa-square text-info"
                          aria-hidden="true"
                        ></i>{" "}
                        Category Name:&nbsp;{" "}
                        <b>{productsData.artCollectionss_category}</b>{" "}
                      </Card.Title>{" "}
                      <br />
                      <br />
                      <Card.Title>
                        <i className="fa fa-square text-info" /> Price:&nbsp;{" "}
                        <b>{productsData.artCollectionss_price}</b>{" "}
                      </Card.Title>{" "}
                      <br />
                      <br />
                      {/* <Card.Title>
                        <i className="fa fa-square text-info" /> Image:&nbsp;{" "}
                        <b>
                          <img
                            src={require(`../uploads/${productsData.collectionsImg}`)}
                            alt="Nft"
                          />
                        </b>{" "}
                      </Card.Title>{" "} */}
                      <br />
                      <br />
                      <Card.Title>
                        <i className="fa fa-square text-info" /> Type:&nbsp;{" "}
                        <b>{productsData.type}</b>{" "}
                      </Card.Title>
                      <br /> <br />
                      <Card.Title>
                        <i className="fa fa-square text-info" /> Status:&nbsp;{" "}
                        <b>{productsData.status}</b>{" "}
                      </Card.Title>
                      <br /> <br />
                      <a
                        href={`/admin/product-edit/${productsData._id}`}
                        className="btn btn-primary"
                      >
                        <i class="fa fa-pen"></i>
                      </a>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>
          </section>
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
