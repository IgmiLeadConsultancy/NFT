import React, { Component } from "react";
import Footer from "./common/Footer";
import AsideBar from "./common/Asidebar2";
import { BASE_API_URL } from "../variables";
class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
    };
  }
  componentDidMount() {
    fetch(`${BASE_API_URL}/userData`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("loggedIn"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        this.setState({ userData: data.data });
      });
  }

  logout = () => {
    window.localStorage.clear();
    window.location.href = "/";
  };




  render() {
    return (
      <div>
        <div className="wrapper">
          <div>
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-widget="pushmenu"
                    href="#/"
                    role="button"
                  >
                    <i className="fas fa-bars" />
                  </a>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                  <a href="index3.html" className="nav-link">
                    Home
                  </a>
                </li>
                <li className="nav-item d-none d-sm-inline-block"></li>
              </ul>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-widget="navbar-search"
                    href="#/"
                    role="button"
                  >
                    <i className="fas fa-search" />
                  </a>
                  <div className="navbar-search-block">
                    <form className="form-inline">
                      <div className="input-group input-group-sm">
                        <input
                          className="form-control form-control-navbar"
                          type="search"
                          placeholder="Search"
                          aria-label="Search"
                        />
                        <div className="input-group-append">
                          <button className="btn btn-navbar" type="submit">
                            <i className="fas fa-search" />
                          </button>
                          <button
                            className="btn btn-navbar"
                            type="button"
                            data-widget="navbar-search"
                          >
                            <i className="fas fa-times" />
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </li>

                <li className="nav-item dropdown">
                  <a className="nav-link" data-toggle="dropdown" href="#/">
                    <i className="fa fa-user" />
                  </a>
                  <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                    <div style={{ marginTop: "", textAlign: "center" }}>

                      <h5 className="text-dark text-center font-weight-bold">
                        {" "}
                        Welcome, <span>{this.state.userData.fname}</span> 👋 &nbsp;
                        <button className="btn  btn-info" onClick={this.logout}>
                          Logout <i className="fa fa-sign-out"></i>
                        </button>
                      </h5>

                    </div>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
          <div>
            <AsideBar />
          </div>
          <div className="content-wrapper">


            <div className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-6"></div>
                </div>
              </div>
            </div>
            <section className="content">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    <div className="editor">
                      <div className="col-md-12"></div>
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
      </div>
    );
  }
}

export default UserDashboard;
