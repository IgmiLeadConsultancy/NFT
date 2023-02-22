import React, { Component } from 'react'

export default class AsideBar extends Component {
  render() {
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3">
            <div className="info d-flex justify-content-center">
              <a href="/user/dashboard" className="d-block">
               Exchange My NFT
              </a>
            </div>
          </div>
          <div className="form-inline">
            <div className="input-group" data-widget="sidebar-search">
              <input
                className="form-control form-control-sidebar"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <div className="input-group-append">
                <button className="btn btn-sidebar">
                  <i className="fas fa-search fa-fw" />
                </button>
              </div>
            </div>
          </div>
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item menu-open">
                <a href="/user/dashboard" className="nav-link">
                <i class="nav-icon fas fa-tachometer-alt"></i> &nbsp;
                  <p>Dashboard</p>
                </a>
              </li>
                    
              <li className="nav-item">
                <a href="/user/dashboard" className="nav-link">
                  <i class="fa fa-users"></i> &nbsp;
                  <p>
                    My Account
                    <i className="fas fa-angle-left right" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="/user/profle" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      My Profile
                    </a>
                  </li>
                  
                </ul>
              </li>
              <li className="nav-item">
                <a href="/user/orders" className="nav-link">
                  <i className="nav-icon fas fa-shopping-cart" />  &nbsp;
                  <p>
                    Orders
                  </p>
                </a>
                
              </li>

              <li className="nav-item">
                <a href="/user/wishlists" className="nav-link">
                <i className="nav-icon fa fa-heart" /> &nbsp;
                  <p>
                    Wishlists
                  </p>
                </a>
                
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    )
  }
}
