import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import icon from "../img/user.png";
import { } from "../actions/auth";
import axios from "axios";
import AsideBar from "./common/AsideBar";

import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./common/EditorToolbar";
import "react-quill/dist/quill.snow.css";
import Footer from './common/Footer';
import { BASE_API_URL } from "../variables";
const TnC = ({ auth: { user } }) => {







  const [userInfo, setuserInfo] = useState({
    tnc: "",
  });

  const ontnc = (value) => {
    setuserInfo({ ...userInfo, tnc: value });
  };

  useEffect(() => {
    const fetchTnC = async () => {
      const resp = await fetch(`${BASE_API_URL}/Fetch-TnC`);
      const json = await resp.json();
      if (resp.ok) {
        setuserInfo(json);
      }
    };

    fetchTnC();
  }, []);

  const [isError] = useState(null);
  const addDetails = async (event) => {
    try {
      event.preventDefault();
      event.persist();

      await axios
        .post(`${BASE_API_URL}/TnC`, {
          tnc: userInfo.tnc,
        })
        .then((data) => {
          console.log(data, "Term & Conditions Data Has Been Updated Successfully")

          if (data.status === 200) {
            alert(`Term & Conditions Data Has Been Updated Successfully`);
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
                <h1 className="m-0">TnC</h1>
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
                            Terms & Conditions <span className="required"> * </span>{" "}
                          </label>
                          <EditorToolbar toolbarId={"t1"} />
                          <ReactQuill
                            theme="snow"
                            value={userInfo.tnc}
                            onChange={ontnc}
                            placeholder={"Write something awesome..."}
                            modules={modules("t1")}
                            formats={formats}
                          />
                        </div>
                        <br />
                        {isError !== null && (
                          <div className="errors"> {isError} </div>
                        )}
                        <div className="form-group col-sm-12" align="center">
                          <button type="submit" className="btn btn-outline-primary btn__theme">
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

TnC.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(TnC);
