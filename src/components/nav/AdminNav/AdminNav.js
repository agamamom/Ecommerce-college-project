/* eslint-disable react/style-prop-object */
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../nav/AdminNav/dashboard.css";
import { Navigation } from "react-minimal-side-navigation";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import { AiOutlineBars } from "react-icons/ai";

const AdminNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 w-[300px] z-30 overflow-y-auto transition duration-300 ease-out transform translate-x-0 bg-white border-r-2 lg:translate-x-0 lg:static lg:inset-0 ${
          isSidebarOpen ? "ease-out translate-x-0" : "ease-in -translate-x-full"
        }`}
      >
        <div className="flex py-[50px] px-[30px] justify-between border-b-[1px] border-[#00000026] border-solid ml-[12px]">
          <img src="/images/logo.png" alt="" />
        </div>
        <Navigation
          // you can use your own router's api to get pathname
          activeItemId={location.pathname}
          onSelect={({ itemId }) => {
            navigate(itemId);
          }}
          items={[
            {
              title: "Dashboard",
              itemId: "/admin/dashboard",
              // you can use your own custom Icon component as well
              // icon is optional
            },
            {
              title: "Product",
              itemId: "/admin/product",

              // subNav: [
              //   {
              //     title: "Projects",
              //     itemId: "/management/projects",
              //   },
              //   {
              //     title: "Members",
              //     itemId: "/management/members",
              //   },
              // ],
            },
            {
              title: "Products",
              itemId: "/admin/products",
            },
            {
              title: "Category",
              itemId: "/admin/category",
            },
            {
              title: "Sub Category",
              itemId: "/admin/sub",
            },
            {
              title: "Coupon",
              itemId: "/admin/coupon",
            },
            {
              title: "Password",
              itemId: "/user/password",
            },
          ]}
        />
      </div>
    </>
  );
};

export default AdminNav;
