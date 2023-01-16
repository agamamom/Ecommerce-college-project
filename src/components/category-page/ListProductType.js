import React, { useState, useEffect } from "react";
import { getProduct, getAllByCategory } from "../../functions/product";

var slugify = require("slugify");

const ListProductType = ({ slug }) => {
  const [allProductByCategory, setAllProductByCategory] = useState([]);

  const title = slugify(slug, { replacement: " " });

  const loadAllProduct = () => {
    getAllByCategory(slug).then((res) => setAllProductByCategory(res.data));
  };

  useEffect(() => {
    loadAllProduct();
  }, []);

  console.log("allProductByCategory", allProductByCategory);

  return (
    <div>
      <div className="grid grid-cols-2">
        <div className="text-left text-[25px] leading-[40px] uppercase">
          {title}
        </div>
        <div className="text-right"></div>
      </div>
    </div>
  );
};

export default ListProductType;
