import React, { Component } from "react";
import Footer from './common/Footer'
import { BASE_API_URL } from "../variables";

class userLogin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }




  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    console.log(email, password);
    fetch(`${BASE_API_URL}/login-user`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status === "ok") {
          alert(`${this.state.email} 😀 Your Are Logged In Successfully`);
          // window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", data.data);
          window.localStorage.setItem("userLoggedIn", true);
          window.location.href = "/";
        }
      });
  }
















  render() {
    return (

      <>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-12 text-light d-flex justify-content-center">
              <form onSubmit={this.handleSubmit}>
                <h3 className="text-center"> <i className="fa fa-sign-in"></i> Sign In</h3>
                <h3 className="text-center">Logg In To Your Account</h3>

                <div className="">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    onChange={(e) => this.setState({ email: e.target.value })}
                  />
                </div>

                <div className="">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    onChange={(e) => this.setState({ password: e.target.value })}
                  />
                </div>

                <div className="">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck1"
                    />
                    <label className="custom-control-label" htmlFor="customCheck1">
                      Remember me
                    </label>
                  </div>
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Sign In
                  </button>
                </div>
                <p className="forgot-password text-center">
                  Dont Have an Account ?
                  <a href="/user/register">Sign Up</a>
                </p>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </>

    );
  }
}

export default userLogin