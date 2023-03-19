import React, { useState, useEffect } from "react";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../../images/laptop.png";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import StarRating from "react-star-ratings";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const { Meta } = Card;

const ProductRelatedCard = ({ product }) => {
  // destructure
  const [tooltip, setTooltip] = useState("Click to add");
  const { t } = useTranslation(["product"]);

  const dispatch = useDispatch();
  const { images, title, description, slug } = product;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const handleAddToCart = () => {
    // create cart array
    let cart = [];
    if (product.quantity < 1) {
      toast.warning(`${OutOfStockToast}`);
      return;
    }
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

      localStorage.setItem("cart", JSON.stringify(unique));
      // show tooltip
      setTooltip("Added");

      // add to reeux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      // show cart items in side drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };
  const OutOfStockToast = t("ProductRelated.This product is out of stock");
  const OutOfStock = t("ProductRelated.Out of stock");
  const AddToCart = t("ProductRelated.Add to Cart");

  return (
    <>
      <div className="py-[18px] flex justify-center">
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
        <Card
          cover={
            <img
              alt=""
              src={images && images.length ? images[0].url : laptop}
              style={{ height: "150px", objectFit: "cover" }}
              className="p-1"
            />
          }
          actions={[
            <Link to={`/product/${slug}`}>
              <EyeOutlined className="text-warning" /> <br />{" "}
              {t("ProductRelated.View Product")}
            </Link>,
            <Tooltip title={tooltip}>
              <div onClick={handleAddToCart}>
                <ShoppingCartOutlined className="text-danger" /> <br />
                {product.quantity < 1 ? `${OutOfStock}` : `${AddToCart}`}
              </div>
            </Tooltip>,
          ]}
        >
          <Meta
            title={title}
            description={`${description && description.substring(0, 40)}...`}
          />
        </Card>
      </div>
    </>
  );
};

export default ProductRelatedCard;
