import React from "react";
import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../../images/laptop.png";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import StarRating from "react-star-ratings";
const { Meta } = Card;

const ProductRelatedCard = ({ product }) => {
  // destructure

  const { images, title, description, slug } = product;
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

      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : laptop}
            style={{ height: "150px", objectFit: "cover" }}
            className="p-1"
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-warning" /> <br /> View Product
          </Link>,
          <>
            <ShoppingCartOutlined className="text-danger" /> <br /> Add to Cart
          </>,
        ]}
      >
        <Meta
          title={title}
          description={`${description && description.substring(0, 40)}...`}
        />
      </Card>
    </>
  );
};

export default ProductRelatedCard;
