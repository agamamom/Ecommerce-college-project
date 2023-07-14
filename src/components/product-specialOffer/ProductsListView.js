import React from "react";
import { CiHeart, CiCircleRemove } from "react-icons/ci";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import StarRating from "react-star-ratings";
import { useTranslation } from "react-i18next";
const ProductsListView = ({ product, handleRemove }) => {
   const { t } = useTranslation(["category"]);
   const arrSubs = [];
   if (product) {
      product.subs.map((proSubs) => {
         return arrSubs.push(proSubs["name"]);
      });
   }
   const result = arrSubs.join(", ");

   const textPrice = product.price;

   const USDPrice = textPrice.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
   });

   const tess = (product) => {
      handleRemove(product);
   };

   return (
      <div className="w-full px-[10px] ">
         <div className="flex justify-between">
            <div className="max-w-[700px]">
               <div className="grid grid-cols-3">
                  <div className="mb-[10px] w-full relative min-h-[300px] d-flex col-span-1">
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
                  <div className="col-span-2 pl-[30px]">
                     <div rel="tag" className="text-[#768b9e] text-[12px]">
                        {result}
                     </div>
                     <div>
                        <Link
                           to={`/product/${product.slug}`}
                           className="text-[14px] leading-[18px] h-[36px] font-bold text-[#0062bd] mt-[6px] cursor-pointer"
                        >
                           {product &&
                              `${
                                 product.title && product.title.substring(0, 45)
                              }...`}
                        </Link>
                     </div>
                     <div className="py-[18px]">
                        {product &&
                        product.ratings &&
                        product.ratings.length > 0 ? (
                           showAverage(product)
                        ) : (
                           <div className="flex items-center">
                              <div className="">
                                 <StarRating
                                    starDimension="18px"
                                    starSpacing="1px"
                                    starRatedColor="yellow"
                                    rating={0}
                                    editing={false}
                                 />
                              </div>
                              <div className="text-[16px] ml-[7px]">
                                 ({product.ratings.length})
                              </div>
                           </div>
                        )}
                     </div>
                     <div>
                        {product &&
                           `${
                              product.description &&
                              product.description.substring(0, 165)
                           }...`}
                     </div>
                  </div>
               </div>
            </div>

            <div className="">
               <div className="text-[20px] text-[#4c4b4b]">{USDPrice} USD</div>
               <Link
                  to={`/product/${product.slug}`}
                  className="block my-[20px]"
               >
                  <div className="text-[14px] text-[#fff] bg-[#fed700] px-[60px] py-[10px] text-center font-bold mb-[10px] rounded-[50px]">
                     {t("ProductListView.Read more")}
                  </div>
               </Link>
               <div className="flex-wrap w-full text-[13px] leading-[18px] flex justify-around items-center pt-[7.5px]">
                  <Link
                     to={`/product/${product.slug}`}
                     className="m-0 p-0 text-[#8598a9] flex cursor-pointer hover-text-black"
                  >
                     <CiHeart className="mr-[3px] text-[18px]" />
                     <span> {t("ProductListView.Wishlist")}</span>
                  </Link>
               </div>
               <div
                  className="flex-wrap w-full text-[13px] leading-[18px] flex justify-around items-center pt-[7.5px]"
                  onClick={() => tess(product._id)}
               >
                  <div className="m-0 p-0 text-[#8598a9] flex cursor-pointer hover-text-black">
                     <CiCircleRemove className="mr-[3px] text-[18px]" />
                     <span> {t("ProductListView.Remove")}</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ProductsListView;
