import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumb } from "antd";
import BreadcrumbComponent from "../components/breadcrumb/Breadcrumb";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import emailjs from "@emailjs/browser";
import { SlBag } from "react-icons/sl";
import { BsPiggyBank } from "react-icons/bs";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { userCart } from "../functions/user";
import ScrollToTop from "react-scroll-to-top";

const Cart = () => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useRef();

  const textPrice = cart.reduce((currentValue, nextValue) => {
    return currentValue + nextValue.count * nextValue.price;
  }, 0);

  const USDPrice = textPrice.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const saveOrderToDb = () => {
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) navigate("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  const saveCashOrderToDb = () => {
    dispatch({
      type: "COD",
      payload: true,
    });
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) navigate("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
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

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_6vbnfln",
        "template_nkq7ts9",
        form.current,
        "_lpdIJEv35_o0aAwk"
      )
      .then(
        (result) => {
          console.log(result.text);
          e.target.reset();
        },
        (error) => {
          console.log(error.text);
        }
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
              <div className="formInstructionsForSeller p-[10px] bg-[#ebebeb6c]">
                <div className="text-[20px] font-semibold text-[#111] text-center mb-[15px] tracking-wider">
                  Special instructions for seller
                </div>
                <form ref={form} onSubmit={sendEmail}>
                  <input type="text" name="user_name" placeholder="Name" />
                  <div className="pb-[10px]"></div>
                  <input type="email" name="user_email" placeholder="Email" />
                  <div className="pb-[10px]"></div>
                  <textarea name="message" placeholder="Message" />
                  <input type="submit" value="Send" />
                </form>
              </div>
              <div className="p-[10px] bg-[#ebebeb6c] mt-3">
                <div className="text-[22px] font-semibold text-black text-center">
                  Cart Total
                </div>

                <div className="font-bold py-[15px] text-center tracking-widest">
                  {USDPrice} USD
                </div>
                <div className="text-center mt-[10px] text-[#666666]">
                  Shipping, taxes, and discounts will be calculated at checkout.
                </div>
                {user ? (
                  <>
                    <button
                      onClick={saveOrderToDb}
                      className="text-center btn w-full button-slide p-0"
                      disabled={!cart.length}
                    >
                      <div className="button">Proceed to Checkout</div>
                    </button>
                    <div className="h-[10px]"></div>
                    <button
                      onClick={saveCashOrderToDb}
                      className="text-center btn w-full button-slide p-0"
                      disabled={!cart.length}
                    >
                      <div className="button"> Pay Cash on Delivery</div>
                    </button>
                  </>
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
              <div className="p-[10px] mt-3">
                <div class="float-left w-full mb-[15px] flex items-center">
                  <SlBag className="text-[35px] text-[#000000ae] mr-[15px]" />
                  <div class="content">
                    <div class="policy-title float-left w-full font-semibold text-[17px] text-[#222]">
                      Security policy
                    </div>
                    <div class="policy-desc">
                      (edit with the Customer Reassurance module)
                    </div>
                  </div>
                </div>

                <div class="float-left w-full mb-[15px] flex items-center">
                  <BsPiggyBank className="text-[35px] text-[#000000ae] mr-[15px]" />
                  <div class="content">
                    <div class="policy-title float-left w-full font-semibold text-[17px] text-[#222]">
                      Delivery policy
                    </div>
                    <div class="policy-desc">
                      (edit with the Customer Reassurance module)
                    </div>
                  </div>
                </div>

                <div class="float-left w-full mb-[15px] flex items-center">
                  <TfiHeadphoneAlt className="text-[35px] text-[#000000ae] mr-[15px]" />
                  <div class="content">
                    <div class="policy-title float-left w-full font-semibold text-[17px] text-[#222]">
                      Return policy
                    </div>
                    <div class="policy-desc">
                      (edit with the Customer Reassurance module)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ScrollToTop smooth />
    </div>
  );
};

export default Cart;
