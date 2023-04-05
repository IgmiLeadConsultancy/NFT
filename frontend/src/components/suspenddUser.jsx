import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AsideBar from "./common/AsideBar";
import DataTable from "react-data-table-component";
import axios from "axios";
import Footer from "./common/Footer";
import { BASE_API_URL } from "../variables";


const SuspendedUsers = () => {
  const [productsData, setProductsData] = useState([]);

  const getProductsData = async () => {
    try {
      const resp = await axios.get(`${BASE_API_URL}/Fetch-Suspended-Users`);
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
      name: "View",
      cell: (row) => (
        <a href={`/admin/users-details/${row._id}`} className="btn btn-success">
          <i class="fa fa-eye"></i>
        </a>
      ),
    },
    {
      name: "Activate",
      cell: (row) => <button className="btn btn-info" onClick={() => activeuser(row._id)}><i className="fa fa-check" /></button>,
    },

  ];


  useEffect(() => {
    getProductsData();
  }, []);




  const activeuser = async (id) => {
    await axios.patch(`${BASE_API_URL}/activeusers/${id}`, {
      headers: {

        "Content-Type": "application/json",
      }
    })
      .then((data) => {
        console.log(data, "User Updated");
        if (data.status === 200) {
          alert(`User Has Been Activated Successfully`);
          window.location.href = "/admin/users";
        }
      })
  }



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
                    <li className="breadcrumb-item active">Suspended Users</li>
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
                    <li className="list-inline-item p-2 btn btn-warning">
                      {" "}
                      <i className="fa fa-ban d-inline"></i>{" "}
                      <a className="text-dark" href="/admin/suspend-users">
                        Suspended Users
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
                    title="Suspended Users' Data"
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
        <Footer />
      </div>
    </div>
  );
};
SuspendedUsers.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(SuspendedUsers);
