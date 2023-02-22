import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Footer from "../common/Footer";

// import aboutusImg from "../../images_files/about-us.jpg"

const AdminPolicyComp = () => {
  const [AdminPolicy, setAdminPolicy] = useState("");

  useEffect(() => {
    const fetchAdminPolicy = async () => {
      const resp = await fetch("http://localhost:5000/Fetch-AdminPolicy");
      const json = await resp.json();
      if (resp.ok) {
        setAdminPolicy(json);
      }
    };

    fetchAdminPolicy();
  }, []);

  return (
    <section className="landing">
      <div className="container-fluid ">
        <div className="row">
          <div className="col-md-12 d-flex justify-content-end">
            <Breadcrumb>
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Breadcrumb.Item active>Admin Policy</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
      </div>
      <h4 className="text-light m-2">Admin Policy</h4>

      {/* Slider Part End */}
      <div className="container p-3">
        <div className="row">
          <div className="col-md-12">
            <h3 className="text-light" align="center">
              {AdminPolicy.adminPolicy}
            </h3>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

AdminPolicyComp.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(AdminPolicyComp);
