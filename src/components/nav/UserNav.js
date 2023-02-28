import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../components/nav/AdminNav/dashboard.css";
import { Navigation } from "react-minimal-side-navigation";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";

const UserNav = () => {
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
          activeItemId={location.pathname}
          onSelect={({ itemId }) => {
            navigate(itemId);
          }}
          items={[
            {
              title: "History",
              itemId: "/user/history",
            },
            {
              title: "Password",
              itemId: "/user/password",
            },
            {
              title: "Wishlist",
              itemId: "/user/wishlist",
            },
          ]}
        />
      </div>
    </>
  );
};

export default UserNav;
