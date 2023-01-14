import React, { useEffect, useState } from "react";
import { getProduct, productStar } from "../functions/product";
import { useParams } from "react-router-dom";
import SingleProduct from "../components/SingleProductInfo/SingleProductInfo";
import { useSelector } from "react-redux";

const Product = () => {
  let { slug } = useParams();
  const [star, setStar] = useState(0);
  const [product, setProduct] = useState({});
  const { user } = useSelector((state) => ({ ...state }));

  const loadSingleProduct = () =>
    getProduct(slug).then((res) => setProduct(res.data));

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star); // current user's star
    }
  });

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    // console.table(newRating, name);
    productStar(name, newRating, user.token).then((res) => {
      console.log("rating clicked", res.data);
      loadSingleProduct(); // if you want to show updated rating in real time
    });
  };

  return (
    <div className="px-[45px]">
      <div className="row pt-4">
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
        />
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
