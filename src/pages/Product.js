import React, { useEffect, useState } from "react";
import { getProduct } from "../functions/product";
import { useParams } from "react-router-dom";
import SingleProduct from "../components/SingleProductInfo/SingleProductInfo";

const Product = () => {
  let { slug } = useParams();
  const [product, setProduct] = useState({});
  const loadSingleProduct = () =>
    getProduct(slug).then((res) => setProduct(res.data));

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  return (
    <div className="px-[45px]">
      <div className="row pt-4">
        <SingleProduct product={product} />
      </div>

      <div className="row">
        <div className="col text-center py-[15px]">
          <hr />
          <h4>Related Products</h4>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Product;
