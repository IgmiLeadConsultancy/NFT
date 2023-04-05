import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./common/EditorToolbar";
import "react-quill/dist/quill.snow.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import icon from "../img/user.png";
// import { logout } from "../actions/auth";
import axios from "axios";
import AsideBar from "./common/AsideBar";
// import { Redirect } from "react-router-dom";
import Footer from "./common/Footer";
import { BASE_API_URL } from '../variables'
const AboutUs = ({ auth: { user } }) => {




  function calcTime(city, offset) {
    var b = new Date()
    var utc = b.getTime() + (b.getTimezoneOffset() * 60000);
    var nd = new Date(utc + (3600000 * offset));
    return nd.getHours();

  }



  var showime = (calcTime('Los Angeles', '-8'));






  const [userInfo, setuserInfo] = useState({
    aboutUs: '',
  });

  const onaboutUs = (value) => {
    setuserInfo({
      ...userInfo,
      aboutUs: value
    });
  }



  useEffect(() => {
    const fetchAbouUs = async () => {
      const resp = await fetch(`${BASE_API_URL}/Fetch-About`);
      const json = await resp.json();
      if (resp.ok) {
        setuserInfo(json);
      }
    };

    fetchAbouUs();
  }, []);



  const [isError] = useState(null);
  const addDetails = async (event) => {
    try {
      event.preventDefault();
      event.persist();

      axios.post(`${BASE_API_URL}/AboutUs`, {
        aboutUs: userInfo.aboutUs,
      })
        .then((data) => {
          console.log(data, "About Us Data Has Been Updated Successfully")

          if (data.status === 200) {
            alert(`About Us Data Has Been Updated Successfully`);
            window.location.href = "/admin/aboutus";
          }

        })
    } catch (error) { throw error; }
  }


  return (
    <div className="wrapper">
      <div>

      </div>
      <div>
        <AsideBar />
      </div>
      <div className="content-wrapper">
        <h5 className="text-dark text-center font-weight-bold">Welcome, {user && user.name} 👋</h5>
        <h5 className="text-dark text-center font-weight-bold">
          {(() => {
            if (showime >= 3 && showime < 12) {
              return <div> Good Morning <i className="fa fa-sun text-warning"></i></div>;
            } else if (showime >= 12 && showime < 18) {
              return <div> Good Afternoon <i className="fa fa-sun text-warning "></i> </div>;
            }

            else if (showime >= 18 && showime < 23) {
              return <div> Good Evening <i className="fa fa-moon text-dark"></i></div>;
            }

            else {
              return <div> Good Evening <i className="fa fa-moon text-dark"></i></div>;

            }

          })()}
        </h5>
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">About Us</h1>
              </div>
            </div>
          </div>
        </div>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="form-group col-md-12 editor">
                <form onSubmit={addDetails} className="update__forms">
                  <h3 className="myaccount-content"> Add  </h3>
                  <div className="form-row">

                    <div className="clearfix"></div>
                    <div className="form-group col-md-12 editor">
                      <label className="font-weight-bold"> About Us <span className="required"> * </span> </label>
                      <EditorToolbar toolbarId={'t1'} />
                      <ReactQuill
                        theme="snow"
                        value={userInfo.aboutUs}
                        onChange={onaboutUs}
                        placeholder={"Write something awesome..."}
                        modules={modules('t1')}
                        formats={formats}
                      />
                    </div>
                    <br />

                    {isError !== null && <div className="errors"> {isError} </div>}
                    <div className="form-group col-sm-12" align="center">
                      <button type="submit" className="btn btn-outline-primary btn__theme"> Save  </button>
                    </div>
                  </div>
                </form>


              </div>

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
AboutUs.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AboutUs);
