import React, { useState, useEffect } from "react";
import { getCategories } from "../../functions/category";
import { Link } from "react-router-dom";
import { getBrands } from "../../functions/product";

const Sidebar = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    getCategories().then((c) => {
      setCategories(c.data);
    });
    getBrands().then((c) => {
      setBrands(c.data);
    });
  }, []);
  console.log("categories", categories);

  return (
    <>
      <div className="border border-[#514e4ee6] h-[500px] rounded-lg">
        <div className="border-b border-solid border-[#75737389] w-full">
          <div className="p-[20px]">All Categories</div>
        </div>
        <div className="my-[15px] w-full">
          {categories.map((c) => (
            <div className="w-[90%] py-[10px] mx-auto border-b border-solid border-[#7573735a]">
              <div className="ml-[20px]">
                <Link to={`/category/${c.slug}`}>{c.name}</Link>
              </div>
            </div>
          ))}
        </div>
        <div className="border-b border-solid border-[#75737389] w-full">
          <div className="p-[20px]"> Featured Brands</div>
        </div>
        <div className="my-[15px] w-full">
          {brands &&
            brands?.map((c) => (
              <div className="w-[90%] py-[10px] mx-auto border-b border-solid border-[#7573735a]">
                <div className="ml-[20px]">{c.brand}</div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
