import React from "react";
import { Drawer } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import DrawerItems from "./DrawerItems";

const SideDrawer = () => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));

  const textPrice = cart.reduce((currentValue, nextValue) => {
    return currentValue + nextValue.count * nextValue.price;
  }, 0);

  const USDPrice = textPrice.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <Drawer
      className="text-center"
      title="JUST ADDED TO YOUR CART"
      placement="right"
      closable={false}
      width={420}
      onClose={() => {
        dispatch({
          type: "SET_VISIBLE",
          payload: false,
        });
      }}
      open={drawer}
      footerStyle={{ background: "#f5f5f5" }}
      footer={
        <div>
          <div className="flex justify-between items-center px-[14px]">
            <div className="p-0 font-bold text-[14px] text-[#666666] tracking-widest">
              Cart total:
            </div>
            <p className="py-[12px]">
              <span className="font-bold text-[15px] text-black tracking-wide">
                {USDPrice} USD
              </span>{" "}
              {cart && cart.count}
            </p>
          </div>
          <Link to="/cart">
            <button
              onClick={() =>
                dispatch({
                  type: "SET_VISIBLE",
                  payload: false,
                })
              }
              className="text-center btn w-full button-slide"
              style={{ padding: 0 }}
            >
              <div className="button">{`View Cart ( ${cart.length} )`}</div>
            </button>
          </Link>
        </div>
      }
    >
      {cart.map((p) => (
        <DrawerItems key={p._id} p={p} />
      ))}
    </Drawer>
  );
};

export default SideDrawer;
