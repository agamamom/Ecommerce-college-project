import React, { useState, useEffect } from "react";
import { getCategories, getCategorySubs } from "../../functions/category";
import { getBrands } from "../../functions/product";
import { Menu, Slider, Radio } from "antd";
import {
   DollarOutlined,
   DownSquareOutlined,
   StarOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import Star from "../../components/forms/Star";
import { useTranslation } from "react-i18next";

const { SubMenu } = Menu;

const SidebarShopFilter = ({
   price,
   setPrice,
   fetchProducts,
   setStar,
   setSub,
   setBrand,
   brand,
   setIsChecked,
   setOk,
   ok,
}) => {
   const [categories, setCategories] = useState([]);
   const [brands, setBrands] = useState([]);
   const [category, setCategory] = useState([]);
   const [subOptions, setSubOptions] = useState([]);
   let dispatch = useDispatch();
   const { t } = useTranslation(["shop"]);
   useEffect(() => {
      getCategories().then((c) => {
         setCategories(c.data);
      });
   }, []);

   const showCategories = () =>
      categories.map((c) => (
         <div key={c._id}>
            <Radio
               value={c._id}
               name={c.name}
               checked={c._id === category}
               onChange={handleCheck}
               className="py-[10px] pl-4 pr-4"
            >
               {c.name}
            </Radio>
            <br />
         </div>
      ));

   const handleCheck = (e) => {
      dispatch({
         type: "SEARCH_QUERY",
         payload: { text: "" },
      });
      setPrice([0, 0]);
      setStar("");
      setSub("");
      setCategory(e.target.value);
      fetchProducts({ category: e.target.value });
      getCategorySubs(e.target.value).then((res) => {
         setSubOptions(res.data);
      });

      setIsChecked(true);

      getBrands(e.target.value).then((res) => {
         setBrands(res.data);
      });
   };

   const handleSlider = (value) => {
      dispatch({
         type: "SEARCH_QUERY",
         payload: { text: "" },
      });
      setPrice(value);
      setStar("");
      setSub("");
      setBrand("");
      setCategory("");
      setTimeout(() => {
         setOk(!ok);
      }, 300);
   };

   // 5. show products by star rating
   const handleStarClick = (num) => {
      dispatch({
         type: "SEARCH_QUERY",
         payload: { text: "" },
      });
      setPrice([0, 0]);
      setBrand("");
      setStar(num);
      setSub("");
      setCategory("");
      fetchProducts({ stars: num });
   };

   const showStars = () => (
      <div className="pr-4 pl-4 py-[10px]">
         <Star starClick={handleStarClick} numberOfStars={5} />
         <Star starClick={handleStarClick} numberOfStars={4} />
         <Star starClick={handleStarClick} numberOfStars={3} />
         <Star starClick={handleStarClick} numberOfStars={2} />
         <Star starClick={handleStarClick} numberOfStars={1} />
      </div>
   );

   const handleSub = (sub) => {
      setSub(sub);
      dispatch({
         type: "SEARCH_QUERY",
         payload: { text: "" },
      });
      setPrice([0, 0]);
      setBrand("");
      setStar("");
      fetchProducts({ sub });
   };

   const handleBrand = (e) => {
      setSub("");
      dispatch({
         type: "SEARCH_QUERY",
         payload: { text: "" },
      });
      setPrice([0, 0]);

      setStar("");
      setBrand(e.target.value);
      fetchProducts({ brand: e.target.value });
   };

   const tesst = [];
   const withoutDuplicates = [];
   if (brands) {
      brands.map((b) => tesst.push(b.brand));

      const withoutDuplicates1 = [...new Set(tesst)];
      withoutDuplicates1.map((w) => withoutDuplicates.push(w));
   }

   return (
      <>
         <div className=" pt-2">
            <h4>{t("SideBar.Search/Filter")}</h4>
            <hr />

            <Menu defaultOpenKeys={["1", "2", "3", "4", "5"]} mode="inline">
               {/* category */}
               <SubMenu
                  key="1"
                  title={
                     <div className="flex items-center">
                        <DownSquareOutlined />
                        <span className="">{t("SideBar.Categories")}</span>
                     </div>
                  }
               >
                  <div style={{ maringTop: "-10px" }}>{showCategories()}</div>
               </SubMenu>

               {/* price */}
               <SubMenu
                  key="2"
                  title={
                     <div className="flex items-baseline">
                        <DollarOutlined />
                        <span>{t("SideBar.Price")}</span>
                     </div>
                  }
               >
                  <div>
                     <Slider
                        className="ml-4 mr-4"
                        tipFormatter={(v) => `$${v}`}
                        range
                        value={price}
                        onChange={handleSlider}
                        max="999"
                     />
                  </div>
               </SubMenu>

               {/* stars */}
               <SubMenu
                  key="3"
                  title={
                     <div className="flex items-center">
                        <StarOutlined />
                        <span className="">{t("SideBar.Rating")}</span>
                     </div>
                  }
               >
                  <div style={{ maringTop: "-10px" }}>{showStars()}</div>
               </SubMenu>

               {/* sub category */}
               {subOptions.length ? (
                  <SubMenu
                     key="4"
                     title={
                        <div className="flex items-center">
                           <DownSquareOutlined />
                           <span className="">
                              {t("SideBar.Sub Categories")}
                           </span>
                        </div>
                     }
                  >
                     <div
                        style={{ maringTop: "-10px" }}
                        className="pl-4 pr-4 py-[10px]"
                     >
                        {subOptions.map((s) => (
                           <div
                              key={s._id}
                              onClick={() => handleSub(s)}
                              className="p-1 m-1 badge badge-secondary"
                              style={{ cursor: "pointer" }}
                           >
                              {s.name}
                           </div>
                        ))}
                     </div>
                  </SubMenu>
               ) : (
                  <div className="d-none"></div>
               )}

               {/* brands */}
               {brands.length ? (
                  <SubMenu
                     key="5"
                     title={
                        <div className="flex items-center">
                           <StarOutlined />
                           <span className="">{t("SideBar.Brands")}</span>
                        </div>
                     }
                  >
                     <div
                        style={{ maringTop: "-10px" }}
                        className="pr-[42px] py-[10px]"
                     >
                        {withoutDuplicates.map((b, index) => (
                           <Radio
                              value={b}
                              name={b}
                              checked={b === brand}
                              onChange={handleBrand}
                              className="pb-1 pl-4 pr-4"
                              key={index}
                           >
                              {b}
                           </Radio>
                        ))}
                     </div>
                  </SubMenu>
               ) : (
                  <div className="d-none"></div>
               )}
            </Menu>
         </div>
      </>
   );
};

export default SidebarShopFilter;
