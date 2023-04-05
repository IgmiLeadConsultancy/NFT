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
const ManageCategories = () => {
  const [categoryData, setcategoryData] = useState([]);

  const getcategoryData = async () => {
    try {
      const resp = await axios.get(`${BASE_API_URL}/Fetch-Categories`);
      setcategoryData(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  const Collumns = [
    {
      name: "Category Name",
      selector: (row) => row.category_name,
    },
    {
      name: "Category Image",
      selector: (row) => (
        <img
          width={70}
          height={70}
          src={require(`../uploads/${row.category_image}`).default}
          alt={"NFT"}
        />
      ),
    },
    {
      name: "Category Title",
      selector: (row) => row.category_title,
    },
    {
      name: "Category Description",
      selector: (row) => row.category_desc,
    },
    {
      name: "Edit",
      cell: (row) => (
        <a href={`/admin/category-edit/${row._id}`} className="btn btn-success">
          <i className="fa fa-pen"></i>
        </a>
      ),
    },
    {
      name: "Delete",
      cell: (row) => (
        <button
          className="btn btn-danger"
          onClick={() => deletecategory(row._id)}
        >
          <i className="fa fa-times"></i>
        </button>
      ),
    },
  ];

  useEffect(() => {
    getcategoryData();
  }, []);

  const deletecategory = async (id) => {
    await axios
      .delete(`http://localhost:5000/deleteCategory/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        console.log(data, "Category Updated");
        if (data.status === 200) {
          alert(`Category Has Been Deleted Successfully`);
          window.location.href = "/admin/category-list";
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
                <h1 className="m-0">Manage Category</h1>
              </div>

              <div className="col-sm-6" align="right">
                <a href="/admin/add-category" className="btn btn-outline-info">
                  <i className="fa fa-plus"></i> Add Categoies
                </a>
              </div>
            </div>
          </div>
        </div>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <DataTable
                  title="Category Data"
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
ManageCategories.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ManageCategories);
