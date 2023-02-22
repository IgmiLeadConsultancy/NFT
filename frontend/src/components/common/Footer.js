import React, { useEffect, useState } from "react";
import axios from "axios";
const Footer = () => {
  const [Logo, setLogo] = useState("");

  const fetchLogo = async () => {
    try {
      const resp = await axios.get(
        "http://localhost:5000/FetchGeneralsettings"
      );
      setLogo(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLogo();
  }, []);

  let img = undefined;
  let cmp_name = undefined;
  let copyright = undefined;

  {
    Logo &&
      Logo.map(
        (cd) => (
          (img = require(`../../uploads/${cd.logo}`).default),
          (cmp_name = cd.company_name),
          (copyright = cd.cpoyright_text)
        )
      );
  }

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <div className="container-fluid">
        <div
          className="row p-3 d-flex justify-content-space-evenly shadow-lg"
          style={{ justifyContent: "space-evenly" }}
        >
          <div className="col-md-2">
            <h4 style={{ color: "white" }}>Market Place</h4>
            <ul className="list-unstyled">
              <li>
                <a href="/">All NFTs</a>
              </li>
              <li>
                <a href="/">Art</a>
              </li>
              <li>
                <a href="/">Music</a>
              </li>
              <li>
                <a href="/">Domain Name</a>
              </li>
              <li>
                <a href="/">Virtual World</a>
              </li>
              <li>
                <a href="/">Collectibles</a>
              </li>
            </ul>
          </div>

          <div className="col-md-2">
            <h4 style={{ color: "white" }}>Resources</h4>
            <ul className="list-unstyled">
              <li>
                <a href="/">Help Centers</a>
              </li>
              <li>
                <a href="/">Partners</a>
              </li>
              <li>
                <a href="/">Suggestions</a>
              </li>
              <li>
                <a href="/">Discord</a>
              </li>
              <li>
                <a href="/">Docs</a>
              </li>
              <li>
                <a href="/">Newsletter</a>
              </li>
            </ul>
          </div>

          <div className="col-md-2">
            <h4 style={{ color: "white" }}>Community</h4>
            <ul className="list-unstyled">
              <li>
                <a href="/">Community</a>
              </li>
              <li>
                <a href="/">Documentations</a>
              </li>
              <li>
                <a href="/">Brand Assests</a>
              </li>
              <li>
                <a href="/">Bolg</a>
              </li>
              <li>
                <a href="/">Forum</a>
              </li>
              <li>
                <a href="/">Mailing Lists</a>
              </li>
            </ul>
          </div>

          <div className="col-md-2">
            <h4 style={{ color: "white" }}>Quick Links</h4>
            <ul className="list-unstyled">
              <li>
                <a href="/aboutus">About Us</a>
              </li>
              <li>
                <a href="/contactus">Contact Us</a>
              </li>
              <li>
                <a href="/adminPolicy">Privacy Policy</a>
              </li>
              <li>
                <a href="/privacy">Admin Policy</a>
              </li>
              <li>
                <a href="/tnc">Terms & Conditions</a>
              </li>
              <li>
                <a href="/faqs">Faqs</a>
              </li>
            </ul>
          </div>

          <div className="col-md-12" align="center">
            <br/>
            <br/>
            <h4 style={{ color: "white" }}>Newsletter</h4>
            <p style={{ color: "rgb(57, 211, 240)" }}>
              Signup for our newsletter to get the latest <br></br> news in your
              inbox.
            </p>
            <form action="" method="post">
              <div className="form-group d-inline">
                <input
                  type="email"
                  className="form-control w-75 d-inline p-2 bg-dark"
                  id="email"
                  placeholder="Enter Your email"
                />
              </div>
              <button className="btn btn-outline-primary d-inline m-2">
                <i className="fa fa-envelope"></i>
              </button>
            </form>
            <br />
            <p style={{ color: "rgb(57, 211, 240)" }}>
              Your email is safe with us. We don't spam.
            </p>
          </div>
          <hr className="text-light font-weight-bold"></hr>
          <div className="col-md-6">
          <br/>
            <br/>
            <p style={{ color: "rgb(57, 211, 240)" }}> {copyright} </p>
          </div>
          <div
            className="col-md-6 d-flex justify-content-end"
            style={{ backgroundSize: "cover" }}
          >
            <div className="social-icons" style={{ backgroundSize: "cover" }}>
            <br/>
            <br/>
              <a
                href="/"
                className="p-2 m-2 bg-info"
                style={{ borderRadius: "52px" }}
              >
                <i className="fa-brands fa-facebook fa-lg" />
              </a>
              <a
                href="/"
                className="p-2 m-2 bg-info"
                style={{ borderRadius: "52px" }}
              >
                <i className="fa-brands fa-twitter fa-lg" />
              </a>
              <a
                href="/"
                className="p-2 m-2 bg-info"
                style={{ borderRadius: "52px" }}
              >
                <i className="fa-brands fa-linkedin fa-lg" />
              </a>
              <a
                href="/"
                className="p-2 m-2 bg-info"
                style={{ borderRadius: "52px" }}
              >
                <i className="fa-brands fa-pinterest fa-lg" />
              </a>
              <a
                href="/"
                className="p-2 m-2 bg-info"
                style={{ borderRadius: "52px" }}
              >
                <i className="fa-brands fa-rss fa-lg" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
