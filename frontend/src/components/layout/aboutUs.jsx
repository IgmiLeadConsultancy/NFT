import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Footer from "../common/Footer";

// import aboutusImg from "../../images_files/about-us.jpg"

const AbouUsComp = () => {
  const [AbouUs, setAbouUs] = useState([]);

  useEffect(() => {
    const fetchAbouUs = async () => {
      const resp = await fetch("http://localhost:5000/Fetch-About");
      const json = await resp.json();
      if (resp.ok) {
        setAbouUs(json);
      }
    };

    fetchAbouUs();
  }, []);

  return (
    <>
      <section className="landing">
        <div className="container-fluid ">
          <div className="row">
            <div className="col-md-12 d-flex justify-content-end">
              <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>About Us</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            
          </div>
        </div>
      <h4 className="text-light m-2">Aout Us</h4>

        {/* Slider Part End */}
        <div className="container p-3 text-light">
          <div className="row">
            <div className="col-md-12">
              <h3 className="" align="center">
                {AbouUs.aboutUs}
              </h3>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

AbouUsComp.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(AbouUsComp);
