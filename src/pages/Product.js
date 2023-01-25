import React, { useEffect, useState } from "react";
import { getProduct, productStar } from "../functions/product";
import { useParams } from "react-router-dom";
import SingleProduct from "../components/SingleProductInfo/SingleProductInfo";
import { useSelector } from "react-redux";
import { getRelated } from "../functions/product";
import ProductRelatedCard from "../components/cards/ProductRelatedCard";
import { useStateValue } from "../StateProvider";
import Brand from "../components/brand/Brand";
import Newletter from "../components/newletter/Newletter";
import Footer from "../components/footer/Footer";
const Product = () => {
  let { slug } = useParams();
  const [star, setStar] = useState(0);
  const [product, setProduct] = useState({});
  const { user } = useSelector((state) => ({ ...state }));
  const [related, setRelated] = useState([]);

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data);
      // load related
      getRelated(res.data._id).then((res) => setRelated(res.data));
    });
  };

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
    console.table(newRating, name);
    productStar(name, newRating, user.token).then((res) => {
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

      <div className="row pb-5">
        {related.length ? (
          related.map((r) => (
            <div key={r._id} className="col-md-2 relatedCard-container">
              <ProductRelatedCard product={r} />
            </div>
          ))
        ) : (
          <div className="text-center col">No Products Found</div>
        )}
      </div>
      <Brand />
      <Newletter />
      <Footer />
    </div>
  );
};

export default Product;
