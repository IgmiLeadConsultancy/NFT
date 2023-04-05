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
      const resp = await axios.get(`${BASE_API_URL}/Fetch-Products`);
      setProductsData(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  const Collumns = [
    {
      name: "Title",
      selector: (row) => row.collection_title,
    },
    {
      name: "Name",
      selector: (row) => row.artCollectionss_name,
    },
    {
      name: "Description",
      selector: (row) => row.artCollectionss_short_desc,
    },
    {
      name: "Category",
      selector: (row) => row.artCollectionss_category,
    },
    {
      name: "Thumbnail",
      selector: (row) => (
        <img
          width={70}
          height={70}
          src={require(`../uploads/${row.collectionsImg}`).default}
          alt={"Florida Fashion"}
        />
      ),
    },
    {
      name: "Price",
      selector: (row) => row.artCollectionss_price,
    },

    {
      name: "Type",
      selector: (row) => row.type,
    },
    {
      name: "Selling Type",
      selector: (row) => row.selling_type,
    },
    {
      name: "Bid Amount(In USD)",
      selector: (row) => row.bid_amount_in_usd,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "View",
      cell: (row) => (
        <a href={`/admin/product-details/${row._id}`} className="btn btn-success">
          <i class="fa fa-eye"></i>
        </a>
      ),
    },
    {
      name: "Edit",
      cell: (row) => (
        <a href={`/admin/product-edit/${row._id}`} className="btn btn-primary">
          <i class="fa fa-pen"></i>
        </a>
      ),
    },


    {
      name: "Delete",
      cell: (row) => <button className="btn btn-danger" onClick={() => deleteUsers(row._id)}><i className="fas fa-times" /></button>,
    },
  ];

  useEffect(() => {
    getProductsData();
  }, []);



  const deleteUsers = async (id) => {
    await axios.delete(`${BASE_API_URL}/deletearts/${id}`, {
      headers: {

        "Content-Type": "application/json",
      }
    }).then((data) => {
      console.log(data, "Arts Collection Has Been Deleted Successfully");

      if (data.status === 200) {
        alert("Arts Collection Has Been Deleted Successfully");
        window.location.href = "/admin/atrsCollections"
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
                <h1 className="m-0">Manage Products</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-11 m-3" align="right">
              <a
                className="btn btn-outline-info"
                href="/admin/add-collections"
              >
                <i className="fa fa-plus"></i> Add Collections
              </a>
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
