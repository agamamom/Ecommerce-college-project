import React from "react";
import { IoIosGitCompare } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import ReactTooltip from "react-tooltip";

const ProductSO = ({
  categories,
  name,
  pic,
  price,
  productBorder,
  productBorderRight,
  product,
}) => {
  console.log("title", product.title);
  return (
    <div className={`h-full ${productBorder} ${productBorderRight} relative`}>
      <div className="px-[24px] pt-[20px] pb-[14px] relative product-inner">
        <div className="relative">
          <span class="mb-[12px] text-[12px] leading-[13px] h-[13px]">
            <a href="#" rel="tag" className="text-[#768b9e]">
              {categories}
            </a>
          </span>
          <a href="#" class="block">
            <h2 class="text-[14px] leading-[18px] h-[36px] font-bold text-[#0062bd] mt-[6px]">
              {product?.title}
            </h2>
            <div class="mb-[10px] w-full relative">
              <img
                width="300"
                height="300"
                src={pic}
                class="max-w-[100%] max-h-[100%] w-auto h-auto m-auto align-middle"
                alt=""
                loading="lazy"
              />
            </div>
          </a>
        </div>
        <div className="">
          <div className="mb-[7px] clear-both flex justify-between items-center h-[36px]">
            <span className="text-[20px] relative">{price}</span>
            <div className="p-[12px] cart-icon-container rounded-[50%]">
              <p data-tip data-for="happyFace">
                <MdOutlineAddShoppingCart className="text-[17px] text-white" />
              </p>

              <ReactTooltip id="happyFace" type="dark">
                <span>Add to cart</span>
              </ReactTooltip>
            </div>
          </div>
          <div className="hover-area">
            <div className="flex-wrap w-full text-[13px] leading-[18px] flex justify-around items-center pt-[7.5px]">
              <div className="m-0 p-0 text-[#8598a9] flex cursor-pointer hover-text-black">
                <CiHeart className="mr-[3px] text-[18px]" />
                <span>Wishlist</span>
              </div>
              <div className="m-0 p-0 text-[#8598a9] flex cursor-pointer hover-text-black">
                <IoIosGitCompare className="mr-[3px] text-[18px]" />
                <span>Compare</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSO;
