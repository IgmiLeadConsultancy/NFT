import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import icon from "../img/user.png";
import { } from "../actions/auth";
import axios from "axios";
import AsideBar from "./common/AsideBar";
import Footer from "./common/Footer";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { BASE_API_URL } from "../variables";
const Addnews = () => {







  const [news_title, setnews_title] = useState("");
  const [news_desc, setnews_desc] = useState("");


  const [file, setFile] = useState("");

  // const history = useHistory();

  const setnewstitle = (e) => {
    const { value } = e.target;
    setnews_title(value);


  };

  const setnewsdesc = (e) => {
    const { value } = e.target;
    setnews_desc(value);


  };

  const setimgfile = (e) => {
    setFile(e.target.files[0]);
  };

  // adduser data

  const addUserData = async (e) => {
    e.preventDefault();

    var formData = new FormData();
    formData.append("news_title", news_title);
    formData.append("news_desc", news_desc);
    formData.append("news_thumbnail", file);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    await axios.post(
      `${BASE_API_URL}/Add-News`,
      formData,
      config
    ).then(() => {
      // Once posted, the user will be notified
      alert("Successfully Added The news");
    });
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
                <h1 className="m-0">Add news</h1>
              </div>
            </div>
          </div>
        </div>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <Form className="mt-3">
                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>News Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="news_title"
                    onChange={setnewstitle}
                    placeholder=""
                  />
                </Form.Group>


                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>News Descriptions</Form.Label>
                  <Form.Control
                    type="text"
                    name="news_desc"
                    onChange={setnewsdesc}
                    placeholder=""
                  />
                </Form.Group>


                <Form.Group className="" controlId="formBasicEmail">
                  <Form.Label>News Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="news_thumbnail"
                    onChange={setimgfile}
                    placeholder=""
                  />
                </Form.Group>

                <Form.Group
                  className=""
                  controlId="formBasicEmail"
                  align="center"
                >
                  <Button variant="primary" type="submit" onClick={addUserData}>
                    Submit
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
Addnews.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Addnews);
