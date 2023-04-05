import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { } from "../actions/auth";
import axios from "axios";
import AsideBar from "./common/AsideBar";
import Footer from "./common/Footer";
import DataTable from "react-data-table-component";
import { BASE_API_URL } from "../variables";

const ManageBrands = () => {
  const [brabdsData, setbrabdsData] = useState([]);

  const getbrandsData = async () => {
    try {
      const resp = await axios.get(`${BASE_API_URL}/Fetch-Brands`);
      setbrabdsData(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  const Collumns = [
    {
      name: "Brand's Name",
      selector: (row) => row.brands_name,
    },
    {
      name: "Brand's Image",
      selector: (row) => (
        <img
          width={70}
          height={70}
          src={row.brands_image}
          alt={"Florida Fashion"}
        />
      ),
    },
    {
      name: "Brand's Title",
      selector: (row) => row.brands_title
    },
    {
      name: "Brand's Description",
      selector: (row) => row.brands_desc,
    },
    {
      name: "Edit",
      cell: (row) => <a href={`/edit?id=${row._id}`} className="btn btn-success">Edit</a>,

    },
    {
      name: "Delete",
      cell: (row) => <button className="btn btn-danger">Delete</button>,

    },
  ];

  useEffect(() => {
    getbrandsData();
  }, []);



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
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <DataTable
                  title="Brands' Data"
                  columns={Collumns}
                  data={brabdsData}
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
ManageBrands.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ManageBrands);
