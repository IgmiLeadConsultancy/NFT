import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Footer from "../common/Footer";

// import privacyImg from "../../images_files/privacy-policy.jpg"

const PrivacyPolicyComp = () => {
  const [PrivacyPolicy, setPrivacyPolicy] = useState("");

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      const resp = await fetch("http://localhost:5000/Fetch-PrivacyPolicy");
      const json = await resp.json();
      if (resp.ok) {
        setPrivacyPolicy(json);
      }
    };
    fetchPrivacyPolicy();
  }, []);

  return (
    <section className="landing">
      <div className="container-fluid ">
        <div className="row">
          <div className="col-md-12 d-flex justify-content-end">
            <Breadcrumb>
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Breadcrumb.Item active>Privacy Policy</Breadcrumb.Item>
            </Breadcrumb>
          </div>

        </div>
      </div>
      <h4 className="text-light m-2">Privacy Policy</h4>

      {/* Slider Part End */}
      <div className="container p-3">
        <div className="row">
          <div className="col-md-12">
            <h3 className="text-light" align="center">
             {PrivacyPolicy.privacyPolicy}
            </h3>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

PrivacyPolicyComp.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(PrivacyPolicyComp);
