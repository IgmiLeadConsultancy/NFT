import React, { Component } from "react";
import Footer from "./common/Footer";
class UserRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: "",
      ip: "",
      country_name: "",
      city_name: "",
      state: "",
      items: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      fname,
      lname,
      email,
      password,
      ip,
      country_name,
      city_name,
      state,
    } = this.state;
    console.log(fname,
      lname,
      email,
      password,
      ip,
      country_name,
      city_name,
      state,);
    fetch("http://localhost:5000/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        fname,
        email,
        lname,
        password,
        ip,
        country_name,
        city_name,
        state,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if(data.status==="ok"){
          alert(`Welcome ${this.state.fname} 👋 You are Awesome . You Have Been Registered`)
          window.location.href="/user/login"
        }
      });
  }

  componentDidMount() {
    fetch(
      "https://geolocation-db.com/json/67273a00-5c4b-11ed-9204-d161c2da74ce"
    )
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          items: json,
        });
      });
  }

  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-light d-flex justify-content-center">
              <form onSubmit={this.handleSubmit}>
                <h3 className="text-center">
                  {" "}
                  <i className="fa fa-user"></i> Sign Up
                </h3>
                <h3 className="text-center"> Create Your Account </h3>

                <div className="">
                  <label>First name</label>
                  <input
                    type="text"
                    
                    className="form-control"
                    placeholder="First name"
                    onChange={(e) => this.setState({ fname: e.target.value })}
                    required
                  />
                </div>

                <div className="">
                  <label>Last name</label>
                  <input
                    type="text"
                    
                    className="form-control"
                    placeholder="Last name"
                    onChange={(e) => this.setState({ lname: e.target.value })}
                    required
                  />
                </div>

                <div className="">
                  <label>Email address</label>
                  <input
                    type="email"
                    
                    className="form-control"
                    placeholder="Enter email"
                    onChange={(e) => this.setState({ email: e.target.value })}
                    required
                  />
                </div>

                <div className="">
                  <label>Password</label>
                  <input
                    type="password"
                    
                    className="form-control"
                    placeholder="Enter password"
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                    required
                  />
                </div>

                <input
                  type="hidden"
                  
                  defaultValue={this.state.items.IPv4}
                />
                <input
                  type="hidden"
                 
                  defaultValue={this.state.items.country_name}
                  
                />
                <input
                  type="hidden"
                  
                  defaultValue={this.state.items.city}
                />
                <input
                  type="hidden"
                  
                  defaultValue={this.state.items.state}
                />

                <div className="d-grid" style={{ marginTop: "23px" }}>
                  <button type="submit" className="btn btn-primary">
                    Sign Up
                  </button>
                </div>
                <p className="forgot-password text-center">
                  Already registered <a href="/user/login">sign in?</a>
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

export default UserRegister;
