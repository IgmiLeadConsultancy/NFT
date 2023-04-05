import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { } from "../actions/auth";
import axios from "axios";
import AsideBar from "./common/AsideBar";
import Footer from "./common/Footer";
import DataTable from "react-data-table-component";
import { BASE_API_URL } from "../variables";
// require('../uploads/')
const ManagePrivateRoutingManageCurrencies = () => {


  //  const [err,setErr]=useState("")

  const [categoryData, setcategoryData] = useState([]);

  const getcategoryData = async () => {
    try {
      const resp = await axios.get(`${BASE_API_URL}/currencies`);
      setcategoryData(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  const Collumns = [
    {
      name: "Currency Name",
      selector: (row) => row.currrency_name,
    },
    {
      name: "Currency Image",
      selector: (row) => (
        <img
          width={70}
          height={70}
          src={require(`../uploads/${row.currrency_image}`).default}
          alt={"NFT"}
        />
      ),
    },

    {
      name: "Edit",
      cell: (row) => (
        <a href={`/admin/currency-edit/${row._id}`} className="btn btn-success">
          <i className="fa fa-pen"></i>
        </a>
      ),
    },
    {
      name: "Delete",
      cell: (row) => (
        <button
          className="btn btn-danger"
          onClick={() => deletecurrency(row._id)}
        >
          <i className="fa fa-times"></i>
        </button>
      ),
    },
  ];

  useEffect(() => {
    getcategoryData();
  }, []);

  const deletecurrency = async (id) => {
    await axios
      .delete(`${BASE_API_URL}/deletecurrency/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        console.log(data, "Category Updated");
        if (data.status === 200) {
          alert(`Currency Has Been Deleted Successfully`);
          window.location.href = "/admin/currencies-list";
          //   setErr(<div className="alert alert-warning alert-dismissible fade show" role="alert">
          //   <strong>Your Currency Has Been Deleted</strong> 
          //   <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          //     <span aria-hidden="true" ><a className="text-dark" href="/admin/currencies-list">Ok</a></span>
          //   </button>
          // </div>
          // );

        }

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
                <h1 className="m-0">Manage Currencies</h1>
              </div>

              <div className="col-sm-6" align="right">
                <a href="/admin/add-currencies" className="btn btn-outline-info">
                  <i className="fa fa-bitcoin"></i>  &nbsp; Add Currencies
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="err">

        </div>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="err">
                {/* {err} */}
              </div>
              <div className="col-md-12">
                <DataTable
                  title="PrivateRoutingManageCurrencies' Data"
                  columns={Collumns}
                  data={categoryData}
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
ManagePrivateRoutingManageCurrencies.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ManagePrivateRoutingManageCurrencies);
