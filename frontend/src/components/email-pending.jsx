import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AsideBar from "./common/AsideBar";
import DataTable from "react-data-table-component";
import axios from "axios";
import { BASE_API_URL } from "../variables";



const PendingEmails = () => {
  const [productsData, setProductsData] = useState([]);

  const getProductsData = async () => {
    try {
      const resp = await axios.get(`${BASE_API_URL}/pendingEmailUsers`);
      setProductsData(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  const Collumns = [
    {
      name: "First Name",
      selector: (row) => row.fname,
    },
    {
      name: "Last Name",
      selector: (row) => row.lname,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phn,
    },
    {
      name: "Password",
      selector: (row) => row.pass,
    },
    {
      name: "Role",
      selector: (row) => row.role,
    },
    // {
    //   name: "Activate",
    //   cell: (row) => <button className="btn btn-info" onClick={() => activateEmail(row._id)}><i className="fa fa-check"/></button>,
    // },

  ];


  useEffect(() => {
    getProductsData();
  }, []);



  const activateEmail = async (id) => {
    const res2 = await axios.patch(`${BASE_API_URL}/activateEmail/${id}`, {
      headers: {

        "Content-Type": "application/json",
      }
    });
    const suspendeduser = await res2.json();
    console.log(suspendeduser);
    if (res2.status === 422 || !suspendeduser) {
      console.log("error");
    }
    else {
      console.log("Email Activated");
    }
  }





  console.log(activateEmail);
  return (
    <div className="wrapper">
      <div>

      </div>
      <div>
        <AsideBar />
      </div>
      <div>
        <div className="content-wrapper">

          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0">User Management</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a href="#/">User Management</a>
                    </li>
                    <li className="breadcrumb-item active">Email Pendings</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <section className="content">
            <div className="container-fluid">
              <div className="row d-flex justify-content-center">
                <div className="col-md-12">
                  <ul className="list-unstyled" align="center">
                    <li className="list-inline-item p-2 btn btn-primary">
                      {" "}
                      <i className="fa fa-user d-inline"></i>{" "}
                      <a className="text-dark" href="/admin/users">
                        All Users
                      </a>
                    </li>
                    <li className="list-inline-item p-2 btn btn-success">
                      {" "}
                      <i className="fa fa-user-plus d-inline"></i>{" "}
                      <a className="text-dark" href="/admin/add-users">
                        Add Users
                      </a>
                    </li>
                    <li className="list-inline-item p-2 btn btn-warning">
                      {" "}
                      <i className="fa fa-ban d-inline"></i>{" "}
                      <a className="text-dark" href="/admin/suspend-users">
                        Suspended Users
                      </a>
                    </li>
                    <li className="list-inline-item p-2 btn btn-info">
                      {" "}
                      <i className="fa fa-envelope"></i>{" "}
                      <a className="text-dark" href="/admin/email-pending">
                        Pendin Emails
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="container-fluid p-5">
              <div className="row">
                <div className="col-md-12">
                  <DataTable
                    title="Pending Emails"
                    columns={Collumns}
                    data={productsData}
                    pagination
                    fixedHeader
                    selectableRows
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div>
        <footer className="main-footer">
          <strong>
            Copyright © 2014-2021
            <a href="https://adminlte.io">AdminLTE.io</a>.
          </strong>
          All rights reserved.
          <div className="float-right d-none d-sm-inline-block">
            <b>Version</b> 3.2.0
          </div>
        </footer>
      </div>
    </div>
  );
};
PendingEmails.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PendingEmails);
