import React, { useState } from "react";
import "../../../src/index.scss";
import MobileNavDropDown from "./MobileNavDropDown/MobileNavDropDown";
import { HiOutlineBars3 } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { BsBag } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import NavTop from "../nav/NavTop";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import firebase from "firebase";

const Header = () => {
  let dispatch = useDispatch();
  let { user } = useSelector((state) => ({ ...state }));
  console.log("USER NEF", user);
  const navigate = useNavigate();
  const [handleSearch, setHandleSearch] = useState(false);
  const [handleDropDown, setHandleDropDown] = useState(false);
  const [handleAccountDropDown, setHandleAccountDropDown] = useState(false);
  const [handleNavMobileDropDown, setHandleNavMobileDropDown] = useState(false);
  const handleMouseOver = (e) => {
    setHandleDropDown(true);
  };
  const handleClickAccount = (e) => {
    setHandleAccountDropDown(!handleAccountDropDown);
    setHandleDropDown(!handleDropDown);
  };
  const handleClickNavMobile = (e) => {
    setHandleNavMobileDropDown(!handleNavMobileDropDown);
  };
  const handleOnBlur = (e) => {
    setHandleDropDown(false);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    navigate("/login");
    setHandleAccountDropDown(!handleAccountDropDown);
    setHandleDropDown(!handleDropDown);
  };

  return (
    <>
      <NavTop />
      <div className="h-[72px] w-full relative flex items-center">
        <div
          className={`bg-[#00000079] transition-all duration-700 absolute top-0 h-[100vh] w-full z-[2]  ${
            handleSearch === true ||
            handleDropDown === true ||
            handleAccountDropDown === true
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          } `}
        ></div>

        <div className="grid grid-cols-12 px-[30px] h-full header-container relative z-[200] bg-white ">
          <div className="col-span-9 flex items-center nav-container">
            <Link to="/" className="mobile:block laptop:hidden">
              <div className="" onClick={(e) => handleClickNavMobile(e)}>
                <HiOutlineBars3 className="text-[22px] mr-[15px]" />
              </div>
            </Link>
            <img src="/images/logo.png" alt="asd" className="mr-[32px]" />
            <Link
              to="/"
              exact
              className="nav-link-border"
              activeStyle={{
                fontWeight: "bold",
                color: "red",
              }}
              style={{ marginRight: "37px" }}
            >
              <div className="text-black font-medium text-[18px]">Home</div>
            </Link>
            <Link
              to="/shop"
              activeStyle={{
                fontWeight: "bold",
                color: "red",
              }}
              className="nav-link-border"
              style={{ marginRight: "37px", position: "relative" }}
            >
              <div
                className="flex items-end leading-[16px] nav-link text-black capitalize font-medium text-[18px]"
                onMouseOver={(e) => handleMouseOver(e)}
                onMouseOut={(e) => handleOnBlur(e)}
              >
                Shop
                <IoIosArrowDown className="text-[12px] ml-[6px] icon-hover" />
              </div>
              <div
                className="absolute w-[280px] flex flex-col p-[20px] top-[calc(100%+14px)] left-0 nav-dropdown z-[10] bg-white border-[1px] border-solid"
                onMouseOver={(e) => handleMouseOver(e)}
                onMouseOut={(e) => handleOnBlur(e)}
              >
                <Link to="/1" className="py-[4px] pl-[10px]">
                  Fashion1
                </Link>
                <Link to="/2" className="py-[4px] pl-[10px]">
                  Fashion2
                </Link>
                <Link to="/3" className="py-[4px] pl-[10px]">
                  Fashion3
                </Link>
              </div>
            </Link>

            <Link
              to="/pages"
              activeStyle={{
                fontWeight: "bold",
                color: "red",
              }}
              className="nav-link-border"
              style={{ marginRight: "37px", position: "relative" }}
            >
              <div
                className="flex items-end leading-[16px] nav-link text-black capitalize font-medium text-[18px]"
                onMouseOver={(e) => handleMouseOver(e)}
                onMouseOut={(e) => handleOnBlur(e)}
              >
                Pages
                <IoIosArrowDown className="text-[12px] ml-[6px] icon-hover " />
              </div>
              <div
                className="absolute w-[280px] flex flex-col p-[20px] top-[calc(100%+14px)] left-0 nav-dropdown z-[10] bg-white border-[1px] border-solid"
                onMouseOver={(e) => handleMouseOver(e)}
                onMouseOut={(e) => handleOnBlur(e)}
              >
                <Link to="/1" className="py-[4px] pl-[10px]">
                  About Us
                </Link>
                <Link to="/2" className="py-[4px] pl-[10px]">
                  Contact Us
                </Link>
                <Link to="/3" className="py-[4px] pl-[10px]">
                  FAQ's
                </Link>
              </div>
            </Link>
            <Link
              to="/blog"
              activeStyle={{
                fontWeight: "bold",
                color: "red",
              }}
              style={{ marginRight: "37px" }}
              className="nav-link-border"
            >
              <div className="flex items-end leading-[16px] text-black font-medium text-[18px]">
                Blog
              </div>
            </Link>
          </div>
          <div className="col-span-3 flex items-center place-content-end ">
            {/* search filed */}
            <div
              className={`fixed ${
                handleSearch === false ? "-top-[100%]" : "top-0"
              } left-0 right-0 h-auto bg-white px-[53px] z-[10] transition-all duration-700`}
            >
              <div className="capitalize text-[#666] text-left mt-[80px]">
                What are you looking for?
              </div>
              <IoCloseSharp
                className="absolute top-[10%] right-[50px] text-[22px] hover:rotate-[180deg] transition-all duration-300"
                onClick={() => {
                  setHandleSearch(!handleSearch);
                }}
              />
              <div className="flex border-b-2 w-full py-[20px] items-center">
                <input
                  type="text"
                  placeholder="Search our product "
                  className="input-search-field w-full"
                />
                <AiOutlineSearch className="text-[28px] text-gray-500 cursor-pointer" />
              </div>
              <div className="flex w-full justify-center mb-[30px] mt-[15px]">
                <div className="font-semibold tracking-wide">
                  Popular Search:
                </div>
                <div className="underline text-gray-500 ml-[10px]">
                  theme-nora
                </div>
              </div>
            </div>

            <div
              className="flex search-field items-center mr-[34px]"
              onClick={() => {
                setHandleSearch(!handleSearch);
              }}
            >
              <AiOutlineSearch className="mr-[10px]" />
              Search
            </div>
            <div className="">
              <div
                className="flex items-center cursor-pointer nav-link"
                onClick={(e) => handleClickAccount(e)}
              >
                {user?.email ? user?.email.split("@")[0] : "My Account"}

                <IoIosArrowDown className="text-[12px] ml-[6px]" />
              </div>
              <div
                className={`absolute w-[280px] flex flex-col p-[20px] top-[100%] right-0 nav-account-dropdown z-[10] bg-white border-[1px] border-solid ${
                  handleAccountDropDown === true
                    ? "visible scale-y-100"
                    : "invisible scale-y-0"
                }`}
              >
                {!user ? (
                  <>
                    <div
                      onClick={(e) => handleClickAccount(e)}
                      onmousedown={(e) => handleOnBlur(e)}
                    >
                      <Link to="/login" className="py-[6px] pl-[10px]">
                        Log in
                      </Link>
                    </div>

                    <Link
                      to="/register"
                      className="py-[6px] pl-[10px]"
                      onClick={(e) => handleClickAccount(e)}
                      onmousedown={(e) => handleOnBlur(e)}
                    >
                      Register
                    </Link>
                  </>
                ) : (
                  <>
                    <div
                      className="py-[6px] pl-[10px] cursor-pointer"
                      onClick={logout}
                      onmousedown={(e) => handleOnBlur(e)}
                    >
                      Logout
                    </div>
                    <Link
                      to="/wishlist"
                      className="py-[6px] pl-[10px]"
                      onClick={(e) => handleClickAccount(e)}
                      onmousedown={(e) => handleOnBlur(e)}
                    >
                      Wishlist
                    </Link>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center ml-[34px] cart-field">
              <BsBag className="mr-[7px] text-[22px] " />
              <div className="h-[18px] w-[18px] bg-black rounded-full text-white flex items-center justify-center text-[12px]">
                0
              </div>
            </div>
          </div>
        </div>
        <div
          className={`absolute w-[100vw] nav-dropDown-mobile flex flex-col top-[72px] mobile:block laptop:hidden left-0 z-[3] border-[1px] border-solid ${
            handleNavMobileDropDown === false && "-top-[339px]"
          }`}
        >
          <MobileNavDropDown />
        </div>
      </div>
    </>
  );
};

export default Header;
