import React from "react";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { useTranslation } from "react-i18next";
const TopCategories = () => {
  const { t } = useTranslation();
  return (
    <div className="px-[45px] mt-[40px]">
      <div className="flex flex-col justify-center items-center">
        <div className="leading-[16px] text-[13px] tracking-[1px]  font-medium text-[#666666] border-[#ccc] border-[1px] px-[16px] py-[9px] mb-[15px]">
          {t("top categories.TOP CATEGORIES")}
        </div>
        <div className="font-semibold mb-[15px] text-black text-[34px] leading-[36px]">
          {t("top categories.Shop By Categories")}
        </div>
        <div className="font-normal text-[#666666] mb-[30px] text-[14px] ;leading-[16px]">
          {t("top categories.Add our new")}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-[14px]">
        <div className="text-[17px] leading-[21px] bg-[#f5f5f5] h-full flex p-[16px]">
          <div className="flex justify-between items-center w-full">
            <img src="/images/top-categories/cameras-resized.png" alt="" />
            <div className="flex justify-center flex-col h-full">
              <div className="mb-[7px] font-extralight uppercase">
                {t("top categories.Catch Big")} <br />
                <strong className="font-bold">
                  {t("top categories.Deals")}
                </strong>{" "}
                {t("top categories.on the")} <br />
                {t("top categories.Cameras")}{" "}
              </div>
              <div className="flex items-center justify-start">
                <div className="text-[16px] font-bold flex items-center">
                  {t("banner.shop now")}
                </div>
                <IoIosArrowDroprightCircle className="text-[22px] text-[#fed400] ml-[10px]" />
              </div>
            </div>
          </div>
        </div>
        <div className="text-[17px] leading-[21px] bg-[#f5f5f5] h-full flex p-[16px]">
          <div className="flex justify-between items-center w-[100%]">
            <div className="w-[50%]">
              <img
                src="/images/top-categories/360-camers.png"
                alt=""
                className="max-w-full"
              />
            </div>
            <div className="flex justify-center items-center flex-col h-full w-[50%]">
              <div className="mb-[7px] font-extralight uppercase">
                Tablets, <br />
                Smartphones <br />
                <strong className="font-bold">
                  {t("top categories.and more")}
                </strong>
              </div>
              <div className="flex items-center justify-start mt-[5px]">
                <span className="uppercase font-light block">
                  <span className="text-[.919em] leading-[.909em] inline-block w-[1.4em] mr-[14px] mb-[2px]">
                    {t("top categories.UP")}
                    <br />
                    {t("top categories.to")}
                  </span>
                  <span className="font-bold text-[2.173em] tracking-tight">
                    70
                  </span>
                  <span className="-top-[0.5em] relative font-bold align-top ml-[2px]">
                    %
                  </span>
                </span>
                <IoIosArrowDroprightCircle className="text-[22px] text-[#fed400] ml-[10px]" />
              </div>
            </div>
          </div>
        </div>
        <div className="text-[17px] leading-[21px] bg-[#f5f5f5] h-full flex p-[16px]">
          <div className="flex justify-between items-center w-full">
            <img src="/images/top-categories/desktop.png" alt="" />
            <div className="flex justify-center flex-col h-full ml-[20px]">
              <div className="mb-[7px] font-extralight uppercase">
                {t("top categories.Shop the")}
                <br />
                {t("top categories.Hottest")}
                <br />
                <strong className="font-bold">
                  {t("top categories.Products")}
                </strong>
              </div>
              <div className="flex items-center justify-start">
                <div className="text-[14px] font-bold flex items-center">
                  {t("banner.shop now")}
                </div>
                <IoIosArrowDroprightCircle className="text-[22px] text-[#fed400] ml-[10px]" />
              </div>
            </div>
          </div>
        </div>
        <div className="text-[17px] leading-[21px] bg-[#f5f5f5] h-full flex p-[16px]">
          <div className="flex justify-between items-center">
            <img src="/images/top-categories/laptop.png" alt="" />
            <div className="flex justify-center flex-col h-full">
              <div className="mb-[7px] font-extralight uppercase">
                {t("top categories.Catch Big")} <br />
                <strong>{t("top categories.Deals")}</strong>{" "}
                {t("top categories.on the")} <br />
                Laptops{" "}
              </div>
              <div className="flex items-center justify-start">
                <div className="text-[14px] font-bold flex items-center">
                  {t("banner.shop now")}
                </div>
                <IoIosArrowDroprightCircle className="text-[22px] text-[#fed400] ml-[10px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCategories;
