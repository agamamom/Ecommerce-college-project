import React from "react";
import { IoIosGitCompare } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import ReactTooltip from "react-tooltip";
import { Link } from "react-router-dom";
import _ from "lodash";
import { useDispatch } from "react-redux";

import { useTranslation } from "react-i18next";

const ProductSO = ({ productBorder, productBorderRight, product, height }) => {
   const { t } = useTranslation();
   const arrSubs = [];
   const dispatch = useDispatch();
   if (product) {
      product.subs.map((proSubs) => {
         return arrSubs.push(proSubs["name"]);
      });
   }
   const result = arrSubs.join(", ");

   const handleAddToCart = () => {
      // create cart array
      let cart = [];
      if (typeof window !== "undefined") {
         // if cart is in local storage GET it
         if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
         }
         // push new product to cart
         cart.push({
            ...product,
            count: 1,
         });
         // remove duplicates
         let unique = _.uniqWith(cart, _.isEqual);
         // save to local storage
         localStorage.setItem("cart", JSON.stringify(unique));
         // add to reeux state
         dispatch({
            type: "ADD_TO_CART",
            payload: unique,
         });
         // show cart items in side drawer
         dispatch({
            type: "SET_VISIBLE",
            payload: true,
         });
      }
   };

   const textPrice = product.price;

   const USDPrice = textPrice.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
   });

   return (
      <div
         className={`${height} ${productBorder} ${productBorderRight} relative`}
      >
         <div className="px-[24px] pt-[20px] pb-[14px] relative product-inner">
            <div className="relative">
               <span className="mb-[12px] text-[12px] leading-[13px] h-[13px]">
                  <div rel="tag" className="text-[#768b9e] whitespace-nowrap">
                     {result.substring(0, 25)}
                  </div>
               </span>
               <Link to={`/product/${product.slug}`} className="block">
                  <h2 className="text-[14px] leading-[18px] h-[36px] font-bold text-[#0062bd] mt-[6px]">
                     {product &&
                        `${product.title && product.title.substring(0, 25)}...`}
                  </h2>
                  <div className="mb-[10px] w-full relative h-[300px] d-flex">
                     {product && (
                        <img
                           width="300"
                           src={product.images && product.images[2].url}
                           className="max-w-[100%] w-auto max-h-[214px] m-auto align-middle"
                           alt=""
                           loading="lazy"
                        />
                     )}
                  </div>
               </Link>
            </div>
            <div className="">
               <div className="mb-[7px] clear-both flex justify-between items-center h-[36px]">
                  <span className="text-[20px] relative">{USDPrice}</span>
                  <div
                     className="p-[12px] cart-icon-container rounded-[50%]"
                     onClick={handleAddToCart}
                  >
                     <p data-tip data-for="happyFace">
                        <MdOutlineAddShoppingCart className="text-[17px] text-white" />
                     </p>

                     <ReactTooltip id="happyFace" type="dark">
                        <span>{t("ProductSo.Add to cart")}</span>
                     </ReactTooltip>
                  </div>
               </div>
               <div className="hover-area">
                  <div className="flex-wrap w-full text-[13px] leading-[18px] flex justify-around items-center pt-[7.5px]">
                     <Link
                        to={`/product/${product.slug}`}
                        className="m-0 p-0 text-[#8598a9] flex cursor-pointer hover-text-black"
                     >
                        <CiHeart className="mr-[3px] text-[18px]" />
                        <span>{t("ProductSo.Wishlist")}</span>
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ProductSO;
