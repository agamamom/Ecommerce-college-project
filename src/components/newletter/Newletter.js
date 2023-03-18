import React from "react";
import { FiSend } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const Newletter = () => {
  const { t } = useTranslation();
  const placeholder = t("NewLetter.Enter your email address");
  return (
    <div className="bg-[#fed400]">
      <div className="px-[45px] py-[15px]">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex justify-center items-center">
              <FiSend className="text-[26px] mr-[15px]" />
              <div className="text-[26px] mr-[25px] leading-[48.5px] mb-0 font-normal">
                {t("NewLetter.Sign up to Newsletter")}
              </div>
            </div>
            <div className="ml-[25px] text-[17px]">
              {t("NewLetter.and receive")}{" "}
              <strong>{t("NewLetter.$20 coupon for first shopping")}</strong>
            </div>
          </div>
          <div className="input-email-container ">
            <form className="flex items-center">
              <input
                type="email"
                placeholder={placeholder}
                className="input-email"
              />
              <button className="button-email">{t("NewLetter.SignUp")}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newletter;
