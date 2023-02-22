import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Footer from "../common/Footer";

// import contactusImg from "../../images_files/contact-us-img.jpg"

const ContactUsComp = () => {
  const [ContactUs, setContactUs] = useState("");

  useEffect(() => {
    const fetchContactUs = async () => {
      const resp = await fetch("http://localhost:5000/Fetch-ContactUs");
      const json = await resp.json();
      if (resp.ok) {
        setContactUs(json);
      }
    };

    fetchContactUs();
  }, []);

  return (
    <section className="landing">
      <div className="container-fluid ">
        <div className="row">
          <div className="col-md-12 d-flex justify-content-end">
            <Breadcrumb>
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Breadcrumb.Item active> Contact Us</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
      </div>
      <h4 className="text-light m-2">Contact Us</h4>

      {/* Slider Part End */}
      <div className="container p-3">
        <div className="row">
          <div className="col-md-12">
            <h3 className="text-light" align="center">
              {ContactUs.contactUs}
            </h3>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

ContactUsComp.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(ContactUsComp);
