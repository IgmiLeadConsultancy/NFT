import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AsideBar from "./common/AsideBar";
import axios from "axios";
import { useParams } from "react-router-dom";
// import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Footer from './common/Footer'
import { BASE_API_URL } from "../variables";

const UserManagement = () => {
  const [productsData, setProductsData] = useState([]);

  // console.log(productsData);

  const { id } = useParams();
  //    console.log(id);

  const getUserData = async () => {
    try {
      const resp = await axios.get(`${BASE_API_URL}/getuser/${id}`);
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
                  <h1 className="m-0">User Management</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a href="#/">User Management</a>
                    </li>
                    <li className="breadcrumb-item active">User Profile</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <section className="content">

            <div className="container-fluid p-5">
              <div className="row">
                <div className="col-md-12" align="center">
                  <Card style={{ width: "50rem", borderRadius: "21px" }}>
                    <Card.Body align="center" style={{ padding: "54px" }}>
                      <Card.Title>
                        <i className="fa fa-user" />  Name:&nbsp;{" "}
                        <b>
                          {productsData.fname}&nbsp;{productsData.lname}
                        </b>{" "}
                      </Card.Title>{" "}
                      <br /><br />

                      <Card.Title>
                        <i className="fa fa-envelope" /> Email:&nbsp; <b>{productsData.email}</b>{" "}
                      </Card.Title>{" "}
                      <br /><br />


                      <Card.Title>
                        <i className="fa fa-clock" /> Active Status:&nbsp; <b>{productsData.status}</b>{" "}
                      </Card.Title>{" "}
                      <br /><br />
                      <Card.Title>
                        <i className="fa fa-calendar" /> User Since:&nbsp;{" "}
                        <b>{Date("productsData.createdAt")}</b>{" "}
                      </Card.Title>{" "}
                      <br /> <br />
                      <a
                        href={`/admin/users-edit/${productsData._id}`}
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
