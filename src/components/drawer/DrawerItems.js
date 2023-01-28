import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { CloseOutlined } from "@ant-design/icons";
import laptop from "../../images/laptop.png";
const DrawerItems = ({ p }) => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));
  const handleRemove = () => {
    // console.log(p._id, "to remove");
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // [1,2,3,4,5]
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart.splice(i, 1);
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const imageStyle = {
    width: "100%",
    height: "85px",
    objectFit: "cover",
  };

  return (
    <div className="pt-1 h-[130px]">
      <div className="">
        {p.images[0] ? (
          <div className="grid grid-cols-6 gap-3 h-full">
            <div className="col-span-2">
              <img src={p.images[0].url} style={imageStyle} />
            </div>
            <div className="col-span-3">
              <div className="text-left">
                {`${p.title && p.title.substring(0, 40)}...`}
                <p className="py-[12px]">
                  <span className="font-bold text-[15px] text-black tracking-wide">
                    $ {p.price} USD
                  </span>{" "}
                  x {p.count}
                </p>
              </div>
            </div>
            <div className="col-span-1">
              <CloseOutlined
                onClick={handleRemove}
                className="text-danger pointer"
              />
            </div>
          </div>
        ) : (
          <>
            <img src={laptop} style={imageStyle} />
            <p className="text-center bg-secondary text-light">
              {p.title} x {p.count}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default DrawerItems;
