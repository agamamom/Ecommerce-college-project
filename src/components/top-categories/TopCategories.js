import React from "react";

const TopCategories = () => {
  return (
    <div className="px-[45px] mt-[80px]">
      <div className="flex flex-col justify-center items-center">
        <div className="leading-[16px] text-[13px] tracking-[1px]  font-medium text-[#666666] border-[#ccc] border-[1px] px-[16px] py-[9px] max-w-[154px] mb-[15px]">
          TOP CATEGORIES
        </div>
        <div className="font-semibold mb-[15px] text-black text-[34px] leading-[36px]">
          Shop By Categories
        </div>
        <div className="font-normal text-[#666666] mb-[30px] text-[14px] ;leading-[16px]">
          Add our new arrivals to your weekly lineup.
        </div>
      </div>
      <div className="grid grid-cols-3 gap-[30px]">
        <div className="relative">
          <div className="category-backgroundImg h-[608px]"></div>
          <div className="flex flex-col justify-center items-center absolute">
            <div>Lingerie Collection</div>
            <div>-8 Items-</div>
          </div>
        </div>
        <div className="relative">
          <div className="category-backgroundImg2 h-[608px]"></div>
          <div className="flex flex-col justify-center items-center absolute">
            <div>Women's Collection</div>
            <div>-20 Items-</div>
          </div>
        </div>
        <div className="relative">
          <div className="category-backgroundImg3 h-[608px]"></div>
          <div className="flex flex-col justify-center items-center absolute">
            <div>Footwear Collection</div>
            <div>-18 Items-</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCategories;
