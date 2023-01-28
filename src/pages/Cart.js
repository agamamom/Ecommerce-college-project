import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import BreadcrumbComponent from "../components/breadcrumb/Breadcrumb";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";

const Cart = () => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDb = () => {
    //
  };

  const showCartItems = () => (
    <table className="table border-[1px] border-solid border-[#e5e5e5]">
      <thead className="thead-light border-[1px] border-solid border-[#e5e5e5]">
        <tr>
          <th scope="col" className="">
            Image
          </th>
          <th scope="col" className="w-[45%]">
            Title
          </th>
          <th scope="col" className="">
            Price
          </th>
          <th scope="col" className="">
            Brand
          </th>
          <th scope="col" className="w-[8%]">
            Count
          </th>
          <th scope="col" className="w-[2%]">
            Remove
          </th>
        </tr>
      </thead>

      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}
    </table>
  );

  const breadCrumb = () => {
    return (
      <div className="py-[50px] flex justify-between items-center relative z-[2px]">
        <div className="text-[30px] uppercase">Cart</div>
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/cart">cart</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
    );
  };

  return (
    <div>
      <BreadcrumbComponent>{breadCrumb()}</BreadcrumbComponent>
      <div className="px-[45px] mt-[40px]">
        <div className="pt-2">
          <div className="row">
            <div className="col-md-8">
              <h4>Cart / {cart.length} Product</h4>

              {!cart.length ? (
                <p>
                  No products in cart.{" "}
                  <Link to="/shop">Continue Shopping.</Link>
                </p>
              ) : (
                showCartItems()
              )}
            </div>
            <div className="col-md-4">
              <div></div>
              <h4>Order Summary</h4>
              <hr />
              <p>Products</p>
              {cart.map((c, i) => (
                <div key={i}>
                  <p>
                    {c.title} x {c.count} = ${c.price * c.count}
                  </p>
                </div>
              ))}
              <hr />
              Total: <b>${getTotal()}</b>
              <hr />
              {user ? (
                <button
                  onClick={saveOrderToDb}
                  className="btn btn-sm btn-primary mt-2"
                  disabled={!cart.length}
                >
                  Proceed to Checkout
                </button>
              ) : (
                <button className="btn btn-sm btn-primary mt-2">
                  <Link
                    to={{
                      pathname: "/login",
                      state: { from: "cart" },
                    }}
                  >
                    Login to Checkout
                  </Link>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
