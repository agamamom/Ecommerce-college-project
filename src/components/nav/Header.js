import React, { useState, useEffect, useRef } from "react";
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
import { getCategories } from "../../functions/category";
import { useTranslation } from "react-i18next";

const Header = () => {
   const { t } = useTranslation();
   let dispatch = useDispatch();
   let { user, cart } = useSelector((state) => ({ ...state }));
   const navigate = useNavigate();
   const [handleSearch, setHandleSearch] = useState(false);
   const [handleDropDown, setHandleDropDown] = useState(false);
   const [handleAccountDropDown, setHandleAccountDropDown] = useState(false);
   const [handleNavMobileDropDown, setHandleNavMobileDropDown] =
      useState(false);
   const [categories, setCategories] = useState([]);
   const { search } = useSelector((state) => ({ ...state }));
   const { text } = search;

   const dropdownRef = useRef(null);

   const placeholder = t("header.search our products");

   const dropdownCateRef = useRef(null);

   useEffect(() => {
      function handleClickOutside(event) {
         if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
         ) {
            setHandleDropDown(false);
            setHandleAccountDropDown(false);
         }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, [dropdownRef]);

   // HANDLE HOVER SHOP AND PAGE
   useEffect(() => {
      function handleMoveOutSide(event) {
         if (
            dropdownCateRef.current &&
            !dropdownCateRef.current.contains(event.target)
         ) {
            setHandleDropDown(false);
            setHandleAccountDropDown(false);
         }
      }

      document.addEventListener("mouseleave", handleMoveOutSide);
      return () => {
         document.removeEventListener("mouseleave", handleMoveOutSide);
      };
   }, [dropdownCateRef]);

   useEffect(() => {
      getCategories().then((c) => {
         setCategories(c.data);
      });
   }, []);

   const handleMouseOver = (e) => {
      setHandleDropDown(true);
   };
   const handleOnBlur = (e) => {
      setHandleDropDown(false);
   };
   const handleClickAccount = (e) => {
      setHandleAccountDropDown(!handleAccountDropDown);
      setHandleDropDown(!handleDropDown);
   };
   const handleClickNavMobile = (e) => {
      setHandleNavMobileDropDown(!handleNavMobileDropDown);
   };

   const handleChange = (e) => {
      dispatch({
         type: "SEARCH_QUERY",
         payload: { text: e.target.value },
      });
   };

   const handleSubmit = (e) => {
      if (e.key === "Enter") {
         e.preventDefault();
         setHandleSearch(!handleSearch);
         navigate(`/shop?${text}`);
      }
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
      window.location.reload();
   };

   const handleDrawer = () => {
      // show cart items in side drawer
      dispatch({
         type: "SET_VISIBLE",
         payload: true,
      });
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
               <div className="col-span-9 flex items-center nav-container ">
                  <Link to="/" className="mobile:block laptop:hidden">
                     <div className="" onClick={(e) => handleClickNavMobile(e)}>
                        <HiOutlineBars3 className="text-[22px] mr-[15px]" />
                     </div>
                  </Link>
                  <Link to="/" className="mr-[40px]">
                     {" "}
                     <svg
                        version="1.1"
                        x="0px"
                        y="0px"
                        width="106px"
                        height="37px"
                        viewBox="0 0 175.748 42.52"
                        enableBackground="new 0 0 175.748 42.52"
                     >
                        <ellipse
                           fillRule="evenodd"
                           clipRule="evenodd"
                           fill="#FDD700"
                           cx="170.05"
                           cy="36.341"
                           rx="5.32"
                           ry="5.367"
                        ></ellipse>
                        <path
                           fillRule="evenodd"
                           clipRule="evenodd"
                           fill="#333E48"
                           d="M30.514,0.71c-0.034,0.003-0.066,0.008-0.056,0.056
						C30.263,0.995,29.876,1.181,29.79,1.5c-0.148,0.548,0,1.568,0,2.427v36.459c0.265,0.221,0.506,0.465,0.725,0.734h6.187
						c0.2-0.25,0.423-0.477,0.669-0.678V1.387C37.124,1.185,36.9,0.959,36.701,0.71H30.514z M117.517,12.731
						c-0.232-0.189-0.439-0.64-0.781-0.734c-0.754-0.209-2.039,0-3.121,0h-3.176V4.435c-0.232-0.189-0.439-0.639-0.781-0.733
						c-0.719-0.2-1.969,0-3.01,0h-3.01c-0.238,0.273-0.625,0.431-0.725,0.847c-0.203,0.852,0,2.399,0,3.725
						c0,1.393,0.045,2.748-0.055,3.725h-6.41c-0.184,0.237-0.629,0.434-0.725,0.791c-0.178,0.654,0,1.813,0,2.765v2.766
						c0.232,0.188,0.439,0.64,0.779,0.733c0.777,0.216,2.109,0,3.234,0c1.154,0,2.291-0.045,3.176,0.057v21.277
						c0.232,0.189,0.439,0.639,0.781,0.734c0.719,0.199,1.969,0,3.01,0h3.01c1.008-0.451,0.725-1.889,0.725-3.443
						c-0.002-6.164-0.047-12.867,0.055-18.625h6.299c0.182-0.236,0.627-0.434,0.725-0.79c0.176-0.653,0-1.813,0-2.765V12.731z
						 M135.851,18.262c0.201-0.746,0-2.029,0-3.104v-3.104c-0.287-0.245-0.434-0.637-0.781-0.733c-0.824-0.229-1.992-0.044-2.898,0
						c-2.158,0.104-4.506,0.675-5.74,1.411c-0.146-0.362-0.451-0.853-0.893-0.96c-0.693-0.169-1.859,0-2.842,0h-2.842
						c-0.258,0.319-0.625,0.42-0.725,0.79c-0.223,0.82,0,2.338,0,3.443c0,8.109-0.002,16.635,0,24.381
						c0.232,0.189,0.439,0.639,0.779,0.734c0.707,0.195,1.93,0,2.955,0h3.01c0.918-0.463,0.725-1.352,0.725-2.822V36.21
						c-0.002-3.902-0.242-9.117,0-12.473c0.297-4.142,3.836-4.877,8.527-4.686C135.312,18.816,135.757,18.606,135.851,18.262z
						 M14.796,11.376c-5.472,0.262-9.443,3.178-11.76,7.056c-2.435,4.075-2.789,10.62-0.501,15.126c2.043,4.023,5.91,7.115,10.701,7.9
						c6.051,0.992,10.992-1.219,14.324-3.838c-0.687-1.1-1.419-2.664-2.118-3.951c-0.398-0.734-0.652-1.486-1.616-1.467
						c-1.942,0.787-4.272,2.262-7.134,2.145c-3.791-0.154-6.659-1.842-7.524-4.91h19.452c0.146-2.793,0.22-5.338-0.279-7.563
						C26.961,15.728,22.503,11.008,14.796,11.376z M9,23.284c0.921-2.508,3.033-4.514,6.298-4.627c3.083-0.107,4.994,1.976,5.685,4.627
						C17.119,23.38,12.865,23.38,9,23.284z M52.418,11.376c-5.551,0.266-9.395,3.142-11.76,7.056
						c-2.476,4.097-2.829,10.493-0.557,15.069c1.997,4.021,5.895,7.156,10.646,7.957c6.068,1.023,11-1.227,14.379-3.781
						c-0.479-0.896-0.875-1.742-1.393-2.709c-0.312-0.582-1.024-2.234-1.561-2.539c-0.912-0.52-1.428,0.135-2.23,0.508
						c-0.564,0.262-1.223,0.523-1.672,0.676c-4.768,1.621-10.372,0.268-11.537-4.176h19.451c0.668-5.443-0.419-9.953-2.73-13.037
						C61.197,13.388,57.774,11.12,52.418,11.376z M46.622,23.343c0.708-2.553,3.161-4.578,6.242-4.686
						c3.08-0.107,5.08,1.953,5.686,4.686H46.622z M160.371,15.497c-2.455-2.453-6.143-4.291-10.869-4.064
						c-2.268,0.109-4.297,0.65-6.02,1.524c-1.719,0.873-3.092,1.957-4.234,3.217c-2.287,2.519-4.164,6.004-3.902,11.007
						c0.248,4.736,1.979,7.813,4.627,10.326c2.568,2.439,6.148,4.254,10.867,4.064c4.457-0.18,7.889-2.115,10.199-4.684
						c2.469-2.746,4.012-5.971,3.959-11.063C164.949,21.134,162.732,17.854,160.371,15.497z M149.558,33.952
						c-3.246-0.221-5.701-2.615-6.41-5.418c-0.174-0.689-0.26-1.25-0.4-2.166c-0.035-0.234,0.072-0.523-0.045-0.77
						c0.682-3.698,2.912-6.257,6.799-6.547c2.543-0.189,4.258,0.735,5.52,1.863c1.322,1.182,2.303,2.715,2.451,4.967
						C157.789,30.669,154.185,34.267,149.558,33.952z M88.812,29.55c-1.232,2.363-2.9,4.307-6.13,4.402
						c-4.729,0.141-8.038-3.16-8.025-7.563c0.004-1.412,0.324-2.65,0.947-3.726c1.197-2.061,3.507-3.688,6.633-3.612
						c3.222,0.079,4.966,1.708,6.632,3.668c1.328-1.059,2.529-1.948,3.9-2.99c0.416-0.315,1.076-0.688,1.227-1.072
						c0.404-1.031-0.365-1.502-0.891-2.088c-2.543-2.835-6.66-5.377-11.704-5.137c-6.02,0.288-10.218,3.697-12.484,7.846
						c-1.293,2.365-1.951,5.158-1.729,8.408c0.209,3.053,1.191,5.496,2.619,7.508c2.842,4.004,7.385,6.973,13.656,6.377
						c5.976-0.568,9.574-3.936,11.816-8.354c-0.141-0.271-0.221-0.604-0.336-0.902C92.929,31.364,90.843,30.485,88.812,29.55z"
                        ></path>
                     </svg>
                  </Link>

                  <Link
                     to="/"
                     exact
                     className="nav-link-border"
                     style={{
                        marginRight: "37px",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                     }}
                  >
                     <div className="text-black font-medium text-[18px]">
                        {t("header.home")}
                     </div>
                  </Link>
                  <Link
                     to="/shop"
                     className="nav-link-border"
                     style={{
                        marginRight: "37px",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        position: "relative",
                     }}
                  >
                     <div
                        className="flex items-end leading-[16px] nav-link text-black capitalize font-medium text-[18px]"
                        onMouseOver={(e) => handleMouseOver(e)}
                        onMouseOut={(e) => handleOnBlur(e)}
                     >
                        {t("header.shop")}
                        <IoIosArrowDown className="text-[12px] ml-[6px] icon-hover" />
                     </div>
                     <div
                        className={`absolute w-[280px] flex flex-col p-[20px] top-[103%] left-0 ${
                           handleDropDown ? "nav-dropdown" : "nav-up"
                        } nav-dropdown nav-up z-[10] bg-white border-t-[1px] text-[#cdc8c078] border-solid`}
                        onMouseOver={(e) => handleMouseOver(e)}
                        onMouseOut={(e) => handleOnBlur(e)}
                     >
                        {categories.map((c) => (
                           <Link
                              to={`/category/${c.slug}`}
                              className="capitalize py-[4px] pl-[10px]"
                              onMouseDown={(e) => handleOnBlur(e)}
                           >
                              {c.name}
                           </Link>
                        ))}
                     </div>
                  </Link>

                  <Link
                     to="/pages"
                     className="nav-link-border"
                     style={{
                        marginRight: "37px",
                        position: "relative",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                     }}
                  >
                     <div
                        className="flex items-end leading-[16px] nav-link text-black capitalize font-medium text-[18px]"
                        onMouseOver={(e) => handleMouseOver(e)}
                        onMouseOut={(e) => handleOnBlur(e)}
                     >
                        {t("header.pages")}
                        <IoIosArrowDown className="text-[12px] ml-[6px] icon-hover " />
                     </div>
                     <div
                        className="absolute w-[280px] flex flex-col p-[20px] top-[103%] left-0 nav-dropdown z-[10] bg-white border-t-[1px] text-[#cdc8c078] border-solid"
                        onMouseOver={(e) => handleMouseOver(e)}
                        onMouseOut={(e) => handleOnBlur(e)}
                     >
                        <Link to="/1" className="py-[4px] pl-[10px]">
                           {t("header.about us")}
                        </Link>
                        <Link to="/2" className="py-[4px] pl-[10px]">
                           {t("header.contact us")}
                        </Link>
                        <Link to="/3" className="py-[4px] pl-[10px]">
                           FAQ's
                        </Link>
                     </div>
                  </Link>
                  <Link
                     to="/blog"
                     style={{
                        marginRight: "37px",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                     }}
                     className="nav-link-border"
                  >
                     <div className="flex items-end leading-[16px] text-black font-medium text-[18px]">
                        {t("header.blog")}
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
                        {t("header.looking for")}
                     </div>
                     <IoCloseSharp
                        className="absolute top-[10%] right-[50px] text-[22px] hover:rotate-[180deg] transition-all duration-300"
                        onClick={() => {
                           setHandleSearch(!handleSearch);
                        }}
                     />
                     <div className="flex border-b-2 w-full py-[20px] items-center">
                        <input
                           type="search"
                           value={text}
                           placeholder={placeholder}
                           className="input-search-field w-full"
                           onChange={handleChange}
                           onKeyDown={(e) => handleSubmit(e)}
                        />
                        <AiOutlineSearch className="text-[28px] text-gray-500 cursor-pointer" />
                     </div>
                     <div className="flex w-full justify-center mb-[30px] mt-[15px]">
                        <div className="font-semibold tracking-wide">
                           {t("header.Popular Search")}
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
                     {t("header.search")}
                  </div>
                  <div className="" ref={dropdownRef}>
                     <div
                        className="flex items-center cursor-pointer nav-link"
                        onClick={(e) => handleClickAccount(e)}
                     >
                        {user?.email ? user?.email.split("@")[0] : "My Account"}

                        <IoIosArrowDown className="text-[12px] ml-[6px]" />
                     </div>
                     <div
                        className={`absolute w-[280px] flex flex-col p-[20px] top-[100%] right-0 nav-account-dropdown z-[10] bg-white border-t-[1px] text-[#cdc8c078] border-solid ${
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
                                 <Link
                                    to="/login"
                                    className="py-[6px] pl-[10px] text-black"
                                 >
                                    {t("header.Log in")}
                                 </Link>
                              </div>

                              <Link
                                 to="/register"
                                 className="py-[6px] pl-[10px]"
                                 onClick={(e) => handleClickAccount(e)}
                                 onmousedown={(e) => handleOnBlur(e)}
                              >
                                 {t("header.Register")}
                              </Link>
                           </>
                        ) : (
                           <>
                              <Link
                                 className="py-[6px] pl-[10px] cursor-pointer text-[#000]"
                                 onClick={logout}
                                 onmousedown={(e) => handleOnBlur(e)}
                              >
                                 {t("header.Logout")}
                              </Link>

                              {user && user.role === "subscriber" && (
                                 <Link
                                    to="/user/history"
                                    className="py-[6px] pl-[10px]"
                                    onClick={(e) => handleClickAccount(e)}
                                    onmousedown={(e) => handleOnBlur(e)}
                                 >
                                    {t("header.Dashboard")}
                                 </Link>
                              )}
                              {user && user.role === "admin" && (
                                 <Link
                                    to="/admin/dashboard"
                                    className="py-[6px] pl-[10px]"
                                    onClick={(e) => handleClickAccount(e)}
                                    onmousedown={(e) => handleOnBlur(e)}
                                 >
                                    {t("header.Dashboard")}
                                 </Link>
                              )}

                              <Link
                                 to="/user/wishlist"
                                 className="py-[6px] pl-[10px]"
                                 onClick={(e) => handleClickAccount(e)}
                                 onmousedown={(e) => handleOnBlur(e)}
                              >
                                 {t("header.Wishlist")}
                              </Link>
                           </>
                        )}
                     </div>
                  </div>

                  <div
                     className="flex items-center ml-[34px] cart-field"
                     onClick={handleDrawer}
                  >
                     <BsBag className="mr-[7px] text-[22px] " />
                     <div className="h-[18px] w-[18px] bg-black rounded-full text-white flex items-center justify-center text-[12px]">
                        {cart.length}
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
