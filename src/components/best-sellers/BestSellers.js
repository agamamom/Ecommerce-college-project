import React from "react";

const BestSellers = () => {
  return (
    <div className="bg-white px-[45px] mt-[40px]">
      <div className="flex mb-[14] items-center justify-between">
        <div className="mr-[44px] text-[22px] font-normal flex-shrink-0 leading-[35px] pb-[8.8px] relative BestSellers-nav-link active">
          Best Sellers
        </div>
        <div className="text-[14px] flex-nowrap flex overflow-auto border-none relative border-t-[1px] border-[#ddd] items-center leading-[14px]">
          <div className="border-[#fed700] bg-transparent rounded-[20px] py-[4.5px] px-[21.4px] border-[2px] text-[15px] text-[#333e48]">
            Top 20
          </div>
          <div className="text-[14px] text-[#333e48] pl-0 ml-[14px]">
            Top 20
          </div>
          <div className="text-[14px] text-[#333e48] pl-0 ml-[14px]">
            Top 20
          </div>
          <div className="text-[14px] text-[#333e48] pl-0 ml-[14px]">
            Top 20
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellers;
