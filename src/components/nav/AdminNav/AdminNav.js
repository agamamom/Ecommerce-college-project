/* eslint-disable react/style-prop-object */
import React from "react";
import { Link } from "react-router-dom";
import "../../nav/AdminNav/dashboard.css";

const AdminNav = () => (
  // <nav>
  //   <ul classNameNameName="nav flex-column">
  //     <li classNameNameName="nav-item">
  //       <Link to="/admin/dashboard" classNameNameName="nav-link">
  //         Dashboard
  //       </Link>
  //     </li>

  //     <li classNameNameName="nav-item">
  //       <Link to="/admin/product" classNameNameName="nav-link">
  //         Product
  //       </Link>
  //     </li>

  //     <li classNameNameName="nav-item">
  //       <Link to="/admin/products" classNameNameName="nav-link">
  //         Products
  //       </Link>
  //     </li>

  //     <li classNameNameName="nav-item">
  //       <Link to="/admin/category" classNameNameName="nav-link">
  //         Category
  //       </Link>
  //     </li>

  //     <li classNameNameName="nav-item">
  //       <Link to="/admin/sub" classNameNameName="nav-link">
  //         Sub Category
  //       </Link>
  //     </li>

  //     <li classNameNameName="nav-item">
  //       <Link to="/admin/coupon" classNameNameName="nav-link">
  //         Coupon
  //       </Link>
  //     </li>

  //     <li classNameNameName="nav-item">
  //       <Link to="/user/password" classNameNameName="nav-link">
  //         Password
  //       </Link>
  //     </li>
  //   </ul>
  // </nav>
  <aside
    id="sidebar"
    className="sidebar sidebar-default open"
    role="navigation"
  >
    <div
      className="sidebar-header header-cover"
      style={{
        backgroundImage:
          "url(" +
          "https://2.bp.blogspot.com/-2RewSLZUzRg/U-9o6SD4M6I/AAAAAAAADIE/voax99AbRx0/s1600/14%2B-%2B1%2B%281%29.jpg" +
          ")",
      }}
    >
      <div className="top-bar"></div>

      <button type="button" className="sidebar-toggle">
        <i className="icon-material-sidebar-arrow"></i>
      </button>

      <div className="sidebar-image">
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/53474/atom_profile_01.jpg" />
      </div>

      <a
        data-toggle="dropdown"
        className="sidebar-brand"
        href="#settings-dropdown"
      >
        john.doe@gmail.com
        <b className="caret"></b>
      </a>
    </div>

    <ul className="nav sidebar-nav">
      <li className="dropdown">
        <ul id="settings-dropdown" className="dropdown-menu">
          <li>
            <a href="#" tabindex="-1">
              Profile
            </a>
          </li>
          <li>
            <a href="#" tabindex="-1">
              Settings
            </a>
          </li>
          <li>
            <a href="#" tabindex="-1">
              Help
            </a>
          </li>
          <li>
            <a href="#" tabindex="-1">
              Exit
            </a>
          </li>
        </ul>
      </li>
      <li>
        <a href="#">
          <i className="sidebar-icon md-inbox"></i>
          Inbox
        </a>
      </li>
      <li>
        <a href="#">
          <i className="sidebar-icon md-star"></i>
          Starred
        </a>
      </li>
      <li>
        <a href="#">
          <i className="sidebar-icon md-send"></i>
          Sent Mail
        </a>
      </li>
      <li>
        <a href="#">
          <i className="sidebar-icon md-drafts"></i>
          Drafts
        </a>
      </li>
      <li className="divider"></li>
      <li className="dropdown">
        <a
          className="ripple-effect dropdown-toggle"
          href="#"
          data-toggle="dropdown"
        >
          All Mail
          <b className="caret"></b>
        </a>
        <ul className="dropdown-menu">
          <li>
            <a href="#" tabindex="-1">
              Social
              <span className="sidebar-badge">12</span>
            </a>
          </li>
          <li>
            <a href="#" tabindex="-1">
              Promo
              <span className="sidebar-badge">0</span>
            </a>
          </li>
        </ul>
      </li>
      <li>
        <a href="#">
          Trash
          <span className="sidebar-badge">3</span>
        </a>
      </li>
      <li>
        <a href="#">
          Spam
          <span className="sidebar-badge">456</span>
        </a>
      </li>
      <li>
        <a href="#">
          Follow Up
          <span className="sidebar-badge badge-circle">i</span>
        </a>
      </li>
    </ul>

    <div className="sidebar-divider"></div>

    <div className="sidebar-text">Text</div>
  </aside>
);

export default AdminNav;
