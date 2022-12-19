/* eslint-disable react/style-prop-object */
import React from "react";
import { Link } from "react-router-dom";
import "../../nav/AdminNav/dashboard.css";

const AdminNav = () => (
  // <nav>
  //   <ul classNameName="nav flex-column">
  //     <li classNameName="nav-item">
  //       <Link to="/admin/dashboard" classNameName="nav-link">
  //         Dashboard
  //       </Link>
  //     </li>

  //     <li classNameName="nav-item">
  //       <Link to="/admin/product" classNameName="nav-link">
  //         Product
  //       </Link>
  //     </li>

  //     <li classNameName="nav-item">
  //       <Link to="/admin/products" classNameName="nav-link">
  //         Products
  //       </Link>
  //     </li>

  //     <li classNameName="nav-item">
  //       <Link to="/admin/category" classNameName="nav-link">
  //         Category
  //       </Link>
  //     </li>

  //     <li classNameName="nav-item">
  //       <Link to="/admin/sub" classNameName="nav-link">
  //         Sub Category
  //       </Link>
  //     </li>

  //     <li classNameName="nav-item">
  //       <Link to="/admin/coupon" classNameName="nav-link">
  //         Coupon
  //       </Link>
  //     </li>

  //     <li classNameName="nav-item">
  //       <Link to="/user/password" classNameName="nav-link">
  //         Password
  //       </Link>
  //     </li>
  //   </ul>
  // </nav>
  <aside className="navbar-aside ps ps--active-y" id="offcanvas_aside">
    <div className="aside-top">
      <a href="index.html" className="brand-wrap">
        <img
          src="assets/imgs/theme/logo.svg"
          className="logo"
          alt="Evara Dashboard"
        />
      </a>
      <div>
        <button className="btn btn-icon btn-aside-minimize">
          {" "}
          <i className="text-muted material-icons md-menu_open"></i>{" "}
        </button>
      </div>
    </div>
    <nav>
      <ul className="menu-aside">
        <li className="menu-item">
          <a className="menu-link" href="index.html">
            {" "}
            <i className="icon material-icons md-home"></i>
            <span className="text">Dashboard</span>
          </a>
        </li>
        <li className="menu-item has-submenu active">
          <a className="menu-link" href="page-products-list.html">
            {" "}
            <i className="icon material-icons md-shopping_bag"></i>
            <span className="text">Products</span>
          </a>
          <div className="submenu" style={{ display: "none" }}>
            <a href="page-products-list.html">Product List</a>
            <a href="page-products-grid.html">Product grid</a>
            <a href="page-products-grid-2.html">Product grid 2</a>
            <a href="page-categories.html" className="active">
              Categories
            </a>
          </div>
        </li>
        <li className="menu-item has-submenu">
          <a className="menu-link" href="page-orders-1.html">
            {" "}
            <i className="icon material-icons md-shopping_cart"></i>
            <span className="text">Orders</span>
          </a>
          <div className="submenu">
            <a href="page-orders-1.html">Order list 1</a>
            <a href="page-orders-2.html">Order list 2</a>
            <a href="page-orders-detail.html">Order detail</a>
            <a href="page-orders-tracking.html">Order tracking</a>
            <a href="page-invoice.html">Invoice</a>
          </div>
        </li>
        <li className="menu-item has-submenu">
          <a className="menu-link" href="page-sellers-cards.html">
            {" "}
            <i className="icon material-icons md-store"></i>
            <span className="text">Sellers</span>
          </a>
          <div className="submenu">
            <a href="page-sellers-cards.html">Sellers cards</a>
            <a href="page-sellers-list.html">Sellers list</a>
            <a href="page-seller-detail.html">Seller profile</a>
          </div>
        </li>
        <li className="menu-item has-submenu">
          <a className="menu-link" href="page-form-product-1.html">
            {" "}
            <i className="icon material-icons md-add_box"></i>
            <span className="text">Add product</span>
          </a>
          <div className="submenu">
            <a href="page-form-product-1.html">Add product 1</a>
            <a href="page-form-product-2.html">Add product 2</a>
            <a href="page-form-product-3.html">Add product 3</a>
            <a href="page-form-product-4.html">Add product 4</a>
          </div>
        </li>
        <li className="menu-item has-submenu">
          <a className="menu-link" href="page-transactions-1.html">
            {" "}
            <i className="icon material-icons md-monetization_on"></i>
            <span className="text">Transactions</span>
          </a>
          <div className="submenu">
            <a href="page-transactions-1.html">Transaction 1</a>
            <a href="page-transactions-2.html">Transaction 2</a>
            <a href="page-transactions-details.html">Transaction Details</a>
          </div>
        </li>
        <li className="menu-item has-submenu">
          <a className="menu-link" href="#">
            {" "}
            <i className="icon material-icons md-person"></i>
            <span className="text">Account</span>
          </a>
          <div className="submenu">
            <a href="page-account-login.html">User login</a>
            <a href="page-account-register.html">User registration</a>
            <a href="page-error-404.html">Error 404</a>
          </div>
        </li>
        <li className="menu-item">
          <a className="menu-link" href="page-reviews.html">
            {" "}
            <i className="icon material-icons md-comment"></i>
            <span className="text">Reviews</span>
          </a>
        </li>
        <li className="menu-item">
          <a className="menu-link" href="page-brands.html">
            {" "}
            <i className="icon material-icons md-stars"></i>
            <span className="text">Brands</span>{" "}
          </a>
        </li>
        <li className="menu-item">
          <a className="menu-link" disabled="" href="#">
            {" "}
            <i className="icon material-icons md-pie_chart"></i>
            <span className="text">Statistics</span>
          </a>
        </li>
      </ul>
      <hr />
      <ul className="menu-aside">
        <li className="menu-item has-submenu">
          <a className="menu-link" href="#">
            {" "}
            <i className="icon material-icons md-settings"></i>
            <span className="text">Settings</span>
          </a>
          <div className="submenu">
            <a href="page-settings-1.html">Setting sample 1</a>
            <a href="page-settings-2.html">Setting sample 2</a>
          </div>
        </li>
        <li className="menu-item">
          <a className="menu-link" href="page-blank.html">
            {" "}
            <i className="icon material-icons md-local_offer"></i>
            <span className="text"> Starter page </span>
          </a>
        </li>
      </ul>
      <br />
      <br />
    </nav>
    <div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
      <div
        className="ps__thumb-x"
        tabindex="0"
        style={{ left: 0, width: 0 }}
      ></div>
    </div>
    <div
      className="ps__rail-y"
      style={{ top: 0, height: 714 + "px", right: 0 }}
    >
      <div
        className="ps__thumb-y"
        tabindex="0"
        style={{ top: 0, height: 673 + "px" }}
      ></div>
    </div>
  </aside>
);

export default AdminNav;
