import React, { useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductListItems from "./ProductListItems";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist } from "../../functions/user";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { createBrowserHistory } from "history";
import { useTranslation } from "react-i18next";

const { TabPane } = Tabs;

const SingleProduct = ({ product, onStarClick, star }) => {
  const { t } = useTranslation(["product"]);

  const { title, description, images, _id } = product;
  const [tooltip, setTooltip] = useState("Click to add");

  const navigate = useNavigate();
  let history = createBrowserHistory();
  // redux
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const { slug } = useParams();
  const handleAddToCart = () => {
    // create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
      // console.log('unique', unique)
      localStorage.setItem("cart", JSON.stringify(unique));
      // show tooltip
      setTooltip("Added");

      // add to reeux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    if (user && user.token) {
      addToWishlist(product._id, user.token).then((res) => {
        toast.success("Added to wishlist");
        navigate("/user/wishlist");
      });
    } else {
      history.push(`/product/${slug}`);
      navigate("/login");
    }
  };
  const More = t("SingleProduct.More");
  const Description = t("SingleProduct.Description");

  return (
    <>
      <div className="col-md-7">
        <Carousel thumbWidth={100} showArrows={true} autoPlay infiniteLoop>
          {images &&
            images.map((i) => (
              <img
                alt=""
                src={i.url}
                key={i.public_id}
                className="h-[500px] object-contain"
              />
            ))}
        </Carousel>
        <div className="min-h-[150px]">
          <Tabs type="card">
            <TabPane tab={Description} key="1">
              {description && description}
            </TabPane>
            <TabPane tab={More} key="2">
              {t("SingleProduct.Call use on")}
            </TabPane>
          </Tabs>
        </div>
      </div>

      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>

        <div className="py-[18px] flex justify-center">
          {product && product.ratings && product.ratings.length > 0 ? (
            showAverage(product)
          ) : (
            <div className="text-center pt-1 pb-3">
              {t("SingleProduct.No rating yet")}
            </div>
          )}
        </div>

        <Card
          actions={[
            <Tooltip title={tooltip}>
              <div onClick={handleAddToCart}>
                <ShoppingCartOutlined className="text-danger" /> <br />
                {t("SingleProduct.Add to Cart")}
              </div>
            </Tooltip>,
            <div onClick={handleAddToWishlist}>
              <HeartOutlined className="text-info" /> <br />{" "}
              {t("SingleProduct.Add to Wishlist")}
            </div>,
            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor="red"
              />
            </RatingModal>,
          ]}
        >
          {product && <ProductListItems product={product} />}
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
