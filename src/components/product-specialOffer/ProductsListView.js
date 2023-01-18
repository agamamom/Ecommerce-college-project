import React from "react";
import { IoIosGitCompare } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import ReactTooltip from "react-tooltip";
import { Link } from "react-router-dom";

const ProductsListView = ({ product }) => {
  const arrSubs = [];
  if (product) {
    product.subs.map((proSubs) => {
      return arrSubs.push(proSubs["name"]);
    });
  }
  const result = arrSubs.join(", ");

  return (
    <div className="w-full px-[10px] ">
      <div className="flex justify-between">
        <div className="max-w-[400px]">
          <div className="grid grid-cols-2">
            <div class="mb-[10px] w-full relative min-h-[300px] d-flex">
              {product && (
                <img
                  width="300"
                  src={product.images && product.images[2].url}
                  class="max-w-[100%] w-auto h-auto m-auto align-middle"
                  alt=""
                  loading="lazy"
                />
              )}
            </div>
            <div>
              <div rel="tag" className="text-[#768b9e] text-[12px]">
                {result}
              </div>
              <div>
                <h2 class="text-[14px] leading-[18px] h-[36px] font-bold text-[#0062bd] mt-[6px]">
                  {product &&
                    `${product.title && product.title.substring(0, 25)}...`}
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className=""></div>
      </div>
    </div>
  );
};

export default ProductsListView;
