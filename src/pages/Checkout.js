import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
  createCashOrderForUser,
} from "../functions/user";
import ReactQuill from "react-quill";
import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");
  // discount price
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, COD } = useSelector((state) => ({ ...state }));
  const couponTrueOrFalse = useSelector((state) => state.coupon);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const USDPrice = total.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  const emptyCart = () => {
    // remove from local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    // remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    // remove from backend
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon("");
      toast.success("Cart is emapty. Contniue shopping.");
    });
  };

  const saveAddressToDb = (e) => {
    e.preventDefault();
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Address saved");
      }
    });
  };

  const applyDiscountCoupon = () => {
    console.log("send coupon to backend", coupon);
    applyCoupon(user.token, coupon).then((res) => {
      console.log("RES ON COUPON APPLIED", res.data);
      if (res.data) {
        setTotalAfterDiscount(res.data);
        // update redux coupon applied
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
      }
      // error
      if (res.data.err) {
        setDiscountError(res.data.err);
        // update redux coupon applied
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      }
    });
  };

  const showProductSummary = () =>
    products.map((p, i) => (
      <div key={i}>
        <div className="flex items-center">
          <div class="product-image">
            <div class="w-[64px] h-[64px] rounded-[8px] bg-white relative">
              <div class="w-full h-full relative overflow-hidden rounded-[8px]">
                <img
                  src={p.product.images[2].url}
                  alt=""
                  className="absolute top-0 left-0 right-0 bottom-0 max-w-[100%] max-h-[100%] m-auto"
                />
              </div>
              <span
                class="product-thumbnail-quantity text-[12px] font-medium whitespace-nowrap py-[1.8px] px-[7.8px] rounded-[2em] bg-[#999999e6] text-white absolute -right-[9px] -top-[9px] z-[3]"
                aria-hidden="true"
              >
                {p.count}
              </span>
            </div>
          </div>
          <div className="pl-[20px] font-medium text-[#4b4b4b] text-[16px]">
            {p.product.title}
          </div>
          <div className="pl-[160px] font-medium text-[#4b4b4b]">
            {(p.product.price * p.count).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </div>
        </div>
      </div>
    ));

  const showApplyCoupon = () => (
    <div className="flex items-center justify-between row ">
      <input
        onChange={(e) => {
          setCoupon(e.target.value);
          setDiscountError("");
        }}
        value={coupon}
        type="text"
        className="form-control col-7"
        placeholder="Your Coupon"
      />
      <button onClick={applyDiscountCoupon} className="btn btn-primary col-4">
        Apply
      </button>
    </div>
  );

  const createCashOrder = () => {
    createCashOrderForUser(user.token, COD, couponTrueOrFalse).then((res) => {
      console.log("USER CASH ORDER CREATED RES ", res);
      // empty cart form redux, local Storage, reset coupon, reset COD, redirect
      if (res.data.ok) {
        // empty local storage
        if (typeof window !== "undefined") localStorage.removeItem("cart");
        // empty redux cart
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });
        // empty redux coupon
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
        // empty redux COD
        dispatch({
          type: "COD",
          payload: false,
        });
        // mepty cart from backend
        emptyUserCart(user.token);
        // redirect
        setTimeout(() => {
          navigate("/user/history");
        }, 1000);
      }
    });
  };

  return (
    <div className="row w-[90%] my-0 mx-auto h-[100vh]">
      <div className="col-md-6 mt-[40px] pr-[6%] h-[100%] border-r-[1px] border-solid border-[#0005]">
        <h2 className="mb-[20px]">Delivery Address</h2>
        {/* {showAddress()} */}
        <form className="needs-validation" onSubmit={saveAddressToDb}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label for="firstName">First name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder="Your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <div className="invalid-feedback">
                Valid first name is required.
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <label for="lastName">Last name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Your last name"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <div className="invalid-feedback">
                Valid last name is required.
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label for="username">Phone Number</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Your Phone"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
              <div className="invalid-feedback w-[100%]">
                Your Phone is required.
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label for="email">
              Email <span className="text-muted">(Optional)</span>
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="invalid-feedback">
              Please enter a valid email address for shipping updates.
            </div>
          </div>

          <div className="mb-3">
            <label for="address">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="1234 Main St"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <div className="invalid-feedback">
              Please enter your shipping address.
            </div>
          </div>
          <button className="btn btn-primary mt-2" type="submit">
            Save
          </button>
        </form>

        <br />
        {discountError && <p className="bg-danger p-2">{discountError}</p>}
      </div>

      <div className="col-md-6 mt-[40px] pr-[130px] h-[100%] pl-[4%]">
        <h2 className="mb-[20px]">Order Summary</h2>

        {showProductSummary()}
        <hr />
        <div className="py-[30px]">{showApplyCoupon()}</div>

        <hr />
        <p className="pt-[15px] tex-[20px] font-bold">Cart Total: {USDPrice}</p>
        <div className="py-[20px]">
          {totalAfterDiscount > 0 && (
            <p className="bg-success p-2 py-[20px] text-[#ffff] text-[25px]">
              Discount Applied: Total Payable: ${totalAfterDiscount}
            </p>
          )}
        </div>

        <div className="row">
          <div className="col-md-6">
            {COD ? (
              <button
                className="btn btn-primary"
                disabled={!addressSaved || !products.length}
                onClick={createCashOrder}
              >
                Place Order
              </button>
            ) : (
              <button
                className="btn btn-primary"
                disabled={!addressSaved || !products.length}
                onClick={() => navigate("/payment")}
              >
                Place Order
              </button>
            )}
          </div>

          <div className="col-md-6">
            <button
              disabled={!products.length}
              onClick={emptyCart}
              className="btn btn-primary"
            >
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
