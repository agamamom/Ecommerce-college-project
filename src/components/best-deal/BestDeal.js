import React, { useEffect, useState } from "react";
import ProductSO from "../product-specialOffer/ProductSO";
import { IoIosGitCompare } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import ReactTooltip from "react-tooltip";
import { getRandomProducts } from "../../functions/product";
import { Link } from "react-router-dom";
import { getCategories } from "../../functions/category";

const BestDeal = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadAllProducts();
  }, []);

  useEffect(() => {
    getCategories().then((c) => {
      setCategories(c.data);
    });
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getRandomProducts().then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <div className="bg-[#f4f4f4] mt-[40px]">
      <div className="px-[45px] pt-[15px] pb-[30px]">
        <ul class="text-[15px] mb-[15px] border-b-[1px] border-b-[#ddd] leading-[38px] whitespace-nowrap justify-center flex flex-wrap list-none">
          <li class="BestDeal-nav-item mr-[22px]">
            <div class="active BestDeal-nav-link active">Best Deals</div>
          </li>
          {categories.map((c) => (
            <div className="mx-[20px]" key={c._id}>
              <Link to={`/category/${c.slug}`}>{c.name}</Link>
            </div>
          ))}
        </ul>
        <div className="grid grid-cols-6 bg-white">
          <div className="grid grid-rows-2">
            {products &&
              products.slice(0, 2).map((product) => (
                <div key={product._id}>
                  <ProductSO productBorderRight="product" product={product} />
                </div>
              ))}
          </div>
          <div className="grid grid-rows-2">
            {products &&
              products.slice(2, 4).map((product) => (
                <div key={product._id}>
                  <ProductSO productBorderRight="product" product={product} />
                </div>
              ))}
          </div>
          <div className="col-span-2 product">
            <div className="px-[24px] pt-[14px] pb-[14px] relative product-inner">
              <div className="relative">
                <span class="mb-[12px] text-[12px] leading-[13px] h-[13px]">
                  <a href="/" rel="tag" className="text-[#768b9e]">
                    Game Console
                  </a>
                </span>
                <a href="/" class="block">
                  <h2 class="text-[14px] leading-[18px] h-[36px] font-bold text-[#0062bd] mt-[6px]">
                    Game Console Controller + USB 3.0 Cable
                  </h2>
                  <div class="my-[40px] w-full relative">
                    <img
                      width="300"
                      height="300"
                      src="https://electro.madrasthemes.com/wp-content/uploads/2016/03/consal.png"
                      class="max-w-[100%] max-h-[100%] w-auto h-auto m-auto align-middle"
                      alt=""
                      loading="lazy"
                    />
                  </div>
                </a>
              </div>

              <div className="pt-[60px] pb-[10px] flex">
                <div className="block w-[70px] border-[1px] border-[#e9e9e9] mr-[10px]">
                  <img
                    src="https://electro.madrasthemes.com/wp-content/uploads/2016/03/gadtet-150x150.png"
                    alt=""
                    className="w-[60px] m-auto max-w-full h-auto align-middle"
                  />
                </div>
                <div className="block w-[70px] border-[1px] border-[#e9e9e9] mr-[10px]">
                  <img
                    src="	https://electro.madrasthemes.com/wp-content/uploads/2016/03/gade1-150x150.png"
                    alt=""
                    className="w-[60px] m-auto max-w-full h-auto align-middle"
                  />
                </div>
                <div className="block w-[70px] border-[1px] border-[#e9e9e9] mr-[10px]">
                  <img
                    src="https://electro.madrasthemes.com/wp-content/uploads/2016/03/consal-300x300.png"
                    alt=""
                    className="w-[60px] m-auto max-w-full h-auto align-middle"
                  />
                </div>
              </div>

              <div className="">
                <div className="mb-[20px] mt-[20px] clear-both relative flex justify-between items-center h-[36px]">
                  <span className="text-[20px] relative">$99.00</span>
                  <div className="p-[9px] w-[120px] cart-icon-container rounded-[40px]">
                    <p
                      data-tip
                      data-for="happyFace"
                      className="flex text-white font-semibold items-center justify-around"
                    >
                      <MdOutlineAddShoppingCart className="text-[17px] text-white" />
                      Add to cart
                    </p>

                    <ReactTooltip id="happyFace" type="dark">
                      <span>Add to cart</span>
                    </ReactTooltip>
                  </div>
                </div>
                <div className="hover-area">
                  <div className="flex-wrap w-full text-[13px] leading-[18px] flex justify-around items-center mt-[40px]">
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
          <div className="grid grid-rows-2">
            {products &&
              products.slice(4, 6).map((product) => (
                <div key={product._id}>
                  <ProductSO productBorderRight="product" product={product} />
                </div>
              ))}
          </div>
          <div className="grid grid-rows-2">
            {products &&
              products.slice(6, 8).map((product) => (
                <div key={product._id}>
                  <ProductSO productBorderRight="product" product={product} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestDeal;
