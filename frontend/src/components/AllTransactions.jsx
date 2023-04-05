import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AsideBar from "./common/AsideBar";
import DataTable from "react-data-table-component";
import axios from "axios";
import Footer from './common/Footer';



const Transactions = () => {
  const [productsData, setProductsData] = useState([]);

  const getProductsData = async () => {
    try {
      const resp = await axios.get("");
      setProductsData(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  const Collumns = [
    {
      name: "Product's Name",
      selector: (row) => row.products_name,
    },
    {
      name: "Product's Short Description",
      selector: (row) => row.products_short_desc,
    },
    {
      name: "Total Allowed Quantity",
      selector: (row) => row.taq,
    },
    {
      name: "Minimum Order Quantity",
      selector: (row) => row.maq,
    },
    {
      name: "Product's Image",
      selector: (row) => (
        <img
          width={70}
          height={70}
          src={`../uploads/${row.products_img}`}
          alt={"Florida Fashion"}
        />
      ),
    },
    {
      name: "Product's Sub Category",
      selector: (row) => row.products_sub_category,
    },

    {
      name: "Product's Brand's Name",
      selector: (row) => row.brands_name,
    },
    {
      name: "Product's Price",
      selector: (row) => row.price,
    },
    {
      name: "Product's Special Price",
      selector: (row) => row.sp_price,
    },
    {
      name: "Product's SKU",
      selector: (row) => row.products_sku,
    },
    {
      name: "Product's SKU Status",
      selector: (row) => row.products_sku_status,
    },
    {
      name: "Product's Big Description",
      selector: (row) => row.products_big_desc,
    },
    {
      name: "Edit",
      cell: (row) => (
        <a href={`/edit?id=${row._id}`} className="btn btn-success">
          Edit
        </a>
      ),
    },
    {
      name: "Delete",
      cell: (row) => <button className="btn btn-danger">Delete</button>,
    },
  ];

  useEffect(() => {
    getProductsData();
  }, []);






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
                  <h1 className="m-0">Transactions (Buy-Sell)</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a href="#/">Transactions</a>
                    </li>
                    <li className="breadcrumb-item active">Transactions</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <section className="content">
            <div className="container-fluid p-5">
              <div className="row">
                <div className="col-md-12">
                  <DataTable
                    title="Transactions' Data"
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
Transactions.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Transactions);
