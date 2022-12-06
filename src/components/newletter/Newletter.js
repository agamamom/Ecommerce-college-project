import React from "react";
import { FiSend } from "react-icons/fi";

const Newletter = () => {
  return (
    <div className="bg-[#fed400]">
      <div className="px-[45px] py-[15px]">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex justify-center items-center">
              <FiSend className="text-[26px] mr-[15px]" />
              <div className="text-[26px] mr-[25px] leading-[48.5px] mb-0 font-normal">
                Sign up to Newsletter
              </div>
            </div>
            <div className="ml-[25px] text-[17px]">
              ...and receive <strong>$20 coupon for first shopping</strong>
            </div>
          </div>
          <div className="input-email-container ">
            <form className="flex items-center">
              <input
                type="email"
                placeholder="Enter your email address"
                className="input-email"
              />
              <button className="button-email">SignUp</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newletter;
