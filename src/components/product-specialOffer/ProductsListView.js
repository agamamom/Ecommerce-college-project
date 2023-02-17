import React from "react";
import { IoIosGitCompare } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import ReactTooltip from "react-tooltip";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import StarRating from "react-star-ratings";

const ProductsListView = ({ product }) => {
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

  return (
    <div className="w-full px-[10px] ">
      <div className="flex justify-between">
        <div className="max-w-[700px]">
          <div className="grid grid-cols-3">
            <div class="mb-[10px] w-full relative min-h-[300px] d-flex col-span-1">
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
            <div className="col-span-2 pl-[30px]">
              <div rel="tag" className="text-[#768b9e] text-[12px]">
                {result}
              </div>
              <div>
                <h2 class="text-[14px] leading-[18px] h-[36px] font-bold text-[#0062bd] mt-[6px]">
                  {product &&
                    `${product.title && product.title.substring(0, 45)}...`}
                </h2>
              </div>
              <div className="py-[18px]">
                {product && product.ratings && product.ratings.length > 0 ? (
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
                    product.description && product.description.substring(0, 165)
                  }...`}
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <div className="text-[20px] text-[#4c4b4b]">{USDPrice} USD</div>
          <Link to={`/product/${product.slug}`} class="block my-[20px]">
            <div className="text-[14px] text-[#fff] bg-[#fed700] px-[60px] py-[10px] text-center font-bold mb-[10px] rounded-[50px]">
              Read more
            </div>
          </Link>
          <div className="flex-wrap w-full text-[13px] leading-[18px] flex justify-around items-center pt-[7.5px]">
            <Link
              to={`/product/${product.slug}`}
              className="m-0 p-0 text-[#8598a9] flex cursor-pointer hover-text-black"
            >
              <CiHeart className="mr-[3px] text-[18px]" />
              <span>Wishlist</span>
            </Link>
            <div className="m-0 p-0 text-[#8598a9] flex cursor-pointer hover-text-black">
              <IoIosGitCompare className="mr-[3px] text-[18px]" />
              <span>Compare</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsListView;
