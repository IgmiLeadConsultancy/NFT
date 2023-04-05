import React, { Component } from 'react'

export default class AsideBar extends Component {
  render() {
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3">
            <div className="info d-flex justify-content-center">
              <a href="/admin/dashboard" className="d-block">
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
                <a href="/admin/dashboard" className="nav-link">
                <i class="nav-icon fas fa-tachometer-alt"></i> &nbsp;
                  <p>Dashboard</p>
                </a>
              </li>
                    
              <li className="nav-item">
                <a href="/admin/dashboard" className="nav-link">
                  <i class="fa fa-users"></i> &nbsp;
                  <p>
                    User Management
                    <i className="fas fa-angle-left right" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="/admin/users" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                     Users
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a href="/admin/earnings" className="nav-link">
                  <i className="nav-icon fas fa-credit-card" />  &nbsp;
                  <p>
                    Earnings
                    
                  </p>
                </a>
                
              </li>

              <li className="nav-item">
                <a href="/admin/wallet-list" className="nav-link">
                  <i className="nav-icon fas fa-wallet" />  &nbsp;
                  <p>
                    Wallets
                  </p>
                </a>
                
              </li>
              <li className="nav-item">
                <a href="/admin/currencies-list" className="nav-link">
                  <i className="fa fa-bitcoin" />  &nbsp; 
                  <p>
                    Currencies
                  </p>
                </a>
                
              </li>

              <li className="nav-item">
                <a href="/admin/dashboard" className="nav-link">
                  <i class="nav-icon fas fa-chart-pie"></i> &nbsp;
                  <p>
                    Transactions
                    <i className="fas fa-angle-left right" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="/admin/transactions" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                     All Transactions
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a href="/admin/category-list" className="nav-link">
                  <i className="nav-icon fa fa-list-alt" /> &nbsp;
                  <p>
                    Categories
                    
                  </p>
                </a>
                
              </li>
              <li className="nav-item">
                <a href="/admin/atrsCollections" className="nav-link">
                  <i className="nav-icon fas fa-hand-holding-heart" />
                  <p>
                    Artworks
                  </p>
                </a>
            
              </li>
              {/* <li className="nav-item">
                <a href="javascript()/dashboard" className="nav-link">
                  <i className="nav-icon fas fa-address-book" /> &nbsp;
                  <p>
                    Contacts
                  </p>
                </a>
              
              </li> */}
              {/* <li className="nav-item">
                <a href="/dashboard" className="nav-link">
                  <i className="nav-icon fas fa-list-ol" /> &nbsp;
                  <p>
                    Subscribers
                  </p>
                </a>
              
              </li> */}
              {/* <li className="nav-item">
                <a href="/admin/news-list" className="nav-link">
                  <i className="nav-icon fas fa-newspaper" /> &nbsp;
                  <p>
                    News
                  </p>
                </a>
              
              </li> */}
              <li className="nav-item">
                <a href="/#" className="nav-link">
                  <i className="fa fa-wrench" /> &nbsp;
                  <p>
                    Settings
                    <i className="fas fa-angle-left right" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="/admin/general-settings" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                     General Settings
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/admin/emails" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                     Email Settings
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/admin/nfts" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                     NFT Settings
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/admin/sliders" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                     Sliders
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/admin/contents" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                     Contents
                    </a>
                  </li>
                  {/* <li className="nav-item">
                    <a href="admin/counters" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                     Counters
                    </a>
                  </li> */}
                </ul>
              </li>
              <li className="nav-item">
                <a href="/admin/dashboard" className="nav-link">
                  <i className="nav-icon fas fa-address-book" /> &nbsp;
                  <p>
                    CMS
                    <i className="fas fa-angle-left right" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="/admin/aboutus" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                     About Us
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/admin/contactus" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                     Contact Us
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/admin/faqs" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                     FAQ
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/admin/privaypolicy" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                     Privacy Policy
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/admin/admin-policy" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                     Admin Pollicy
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/admin/tnc" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                    Terms & Conditions
                    </a>
                  </li>
                  
                </ul>
              </li>
              
            </ul>
          </nav>
        </div>
      </aside>
    )
  }
}
