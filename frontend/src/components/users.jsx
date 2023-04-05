import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { } from "../actions/auth";
import axios from "axios";
import AsideBar from "./common/AsideBar";
import Footer from "./common/Footer";
import DataTable from "react-data-table-component";
import { BASE_API_URL } from "../variables";

const ManageProducts = () => {
  const [productsData, setProductsData] = useState([]);

  const getProductsData = async () => {
    try {
      const resp = await axios.get(`${BASE_API_URL}/usersFetching`);
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
      name: "Email Address",
      selector: (row) => row.email,
    },

    {
      name: "Unique ID",
      selector: (row) => row.uuid,
    },

    {
      name: "Status",
      selector: (row) => row.status,
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
      name: "Edit",
      cell: (row) => (
        <a href={`/admin/users-edit/${row._id}`} className="btn btn-primary">
          <i class="fa fa-pen"></i>
        </a>
      ),
    },


    {
      name: "Delete",
      cell: (row) => <button className="btn btn-danger" onClick={() => deleteUsers(row._id)}><i className="fas fa-user-times" /></button>,
    },


    {
      name: "Suspend",
      cell: (row) => <button className="btn btn-warning" onClick={() => suspenduser(row._id)}> <i className="fa fa-ban" /></button>,
    },
  ];

  useEffect(() => {
    getProductsData();
  }, []);




  const deleteUsers = async (id) => {
    await axios.delete(`${BASE_API_URL}/deleteusers/${id}`, {
      headers: {

        "Content-Type": "application/json",
      }
    })
      .then((data) => {
        console.log(data, "User Updated")
        if (data.status === 200) {
          alert(`${productsData.fname} Has Been Deleted Successfully`);
          window.location.href = "/admin/users";
        }
      });

  }





  const suspenduser = async (id) => {
    await axios.patch(`${BASE_API_URL}/suspendusers/${id}`, {
      headers: {

        "Content-Type": "application/json",
      }
    })
      .then((data) => {
        console.log(data, "User Updated");
        if (data.status === 200) {
          alert(`User Has Been Suspended Successfully`);
          window.location.href = "/admin/suspend-users";
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
      <div className="content-wrapper">

        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Manage Users</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row p-3">
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
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <DataTable
                  title="Products' Data"
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
      <div>
        <Footer />
      </div>
    </div>
  );
};
ManageProducts.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ManageProducts);
