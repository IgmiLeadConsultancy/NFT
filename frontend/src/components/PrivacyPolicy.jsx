import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import icon from "../img/user.png";
import { } from "../actions/auth";
import axios from "axios";
import AsideBar from "./common/AsideBar";
import Footer from "./common/Footer";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./common/EditorToolbar";
import "react-quill/dist/quill.snow.css";
import { BASE_API_URL } from "../variables";

const PrivacyPolicy = () => {






  const [userInfo, setuserInfo] = useState({
    privacyPolicy: "",
  });

  const onprivacyPolicy = (value) => {
    setuserInfo({ ...userInfo, privacyPolicy: value });
  };
  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      const resp = await fetch(`${BASE_API_URL}/Fetch-PrivacyPolicy`);
      const json = await resp.json();
      if (resp.ok) {
        setuserInfo(json);
      }
    };

    fetchPrivacyPolicy();
  }, []);
  const [isError] = useState(null);
  const addDetails = async (event) => {
    try {
      event.preventDefault();
      event.persist();

      await axios
        .post(`${BASE_API_URL}/PrivacyPolicy`, {
          privacyPolicy: userInfo.privacyPolicy,
        })
        .then((data) => {
          console.log(data, "Privacy Policy Data Has Been Updated Successfully")

          if (data.status === 200) {
            alert(`Privacy Policy Data Has Been Updated Successfully`);
            window.location.href = "/admin/aboutus";
          }

        })
    } catch (error) {
      throw error;
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
                <h1 className="m-0">Privacy Policy</h1>
              </div>
            </div>
          </div>
        </div>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="editor">
                  <div className="col-md-12">
                    <form onSubmit={addDetails} className="update__forms">
                      <h3 className="myaccount-content"> Add </h3>
                      <div className="form-row">

                        <div className="clearfix"></div>
                        <div className="form-group col-md-12 editor">
                          <label className="font-weight-bold">
                            {" "}
                            Privacy Policy <span className="required"> * </span>{" "}
                          </label>
                          <EditorToolbar toolbarId={"t1"} />
                          <ReactQuill
                            theme="snow"
                            value={userInfo.privacyPolicy}
                            onChange={onprivacyPolicy}
                            placeholder={"Write something awesome..."}
                            modules={modules("t1")}
                            formats={formats}
                          />
                        </div>
                        <br />
                        {isError !== null && (
                          <div className="errors"> {isError} </div>
                        )}
                        <div className="form-group col-sm-12 text-right">
                          <button type="submit" className="btn btn__theme">
                            {" "}
                            Submit{" "}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
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
}

PrivacyPolicy.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivacyPolicy);
