import React from "react";
import LanguageDropdown from "../nav/LanguageDropdown/LanguageDropdown";
import { BsPercent } from "react-icons/bs";
import { SiOdnoklassniki } from "react-icons/si";
import { MdPhoneInTalk } from "react-icons/md";
import { IoMailOpen } from "react-icons/io5";
import { useTranslation } from "react-i18next";
const NavTop = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-black px-[30px] flex justify-between h-[42px] w-[100%] relative z-[200]">
      <div className="flex w-[240px] justify-between items-center">
        <div className="">
          <LanguageDropdown className="text-white" />
        </div>
        <div className="relative h-[55%]">
          <div className="w-[0.4px] h-full left-[50%] text-[#5E5C5C] bg-[#5E5C5C] -translate-x-[50%] "></div>
        </div>
        <div className="flex items-center clearance-sales">
          <BsPercent className="text-[#ff5635] mr-[6px] icon-percent transition-all duration-300" />
          <div className="text-[#ff5635] tracking-wide font-semibold hover:text-white icon-percent transition-all duration-300">
            {t("clearence sales")}
          </div>
        </div>
      </div>
      <div className="text-white flex items-center text-[14px]">
        <SiOdnoklassniki className="mr-[6px]" />
        {t("hurra")}
      </div>
      <div className="flex w-[316px] justify-between items-center ">
        <div className="flex items-center text-white hover-langDropdown">
          <MdPhoneInTalk className="text-white transition-all duration-300" />
          <a
            href="tel:+01-987-654-3210"
            className="tracking-wide ml-[6px] transition-all duration-300 text-white"
          >
            +01-987-654-3210
          </a>
        </div>
        <div className="relative h-[55%]">
          <div className="w-[0.4px] h-full left-[50%] text-[#5E5C5C] bg-[#5E5C5C] -translate-x-[50%] "></div>
        </div>
        <div className="flex items-center text-white hover-langDropdown">
          <IoMailOpen className="text-white transition-all duration-300" />
          <a
            href="mailto:contact@store.com"
            className="tracking-wide ml-[6px] transition-all duration-300 text-white"
          >
            contact@store.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavTop;
