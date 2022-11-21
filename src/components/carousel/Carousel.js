import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";

const Carousel = () => {
  return (
    <div className="h-[calc(100vh-112px)] carousel-container">
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper h-full"
      >
        <SwiperSlide>
          <div className="relative h-[100%]">
            <img src="/images/carousel/carousel4.jpg" alt="" />
            <div className="absolute bottom-[20%] max-w-[546px] left-[50%] -translate-x-[50%] text-center">
              <div className="text-white text-[20px] leading-[18px] mb-[10px]">
                The All New Gorgeous Collection, 2021
              </div>
              <div className="text-[54px] leading-[60px] tracking-wide text-white mb-[20px] font-bold">
                The New Branded Wear Incoming
              </div>
              <div className="border-b-[1px] border-[#fff] py-[16px] w-[133.55px] absolute left-[50%] -translate-x-[50%]">
                <a
                  href="#"
                  className="bg-[#fff] text-[#111111] text-[16px] font-semibold py-[12px] px-[29px] mb-[5px]"
                >
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative h-[100%]">
            <img src="/images/carousel/carousel3.jpg" alt="" />
            <div className="absolute bottom-[40%] max-w-[532px] left-[24%] -translate-x-[50%] text-center">
              <div className="text-black text-[20px] leading-[18px] mb-[10px]">
                Shop Now & Save Up To 25% OFF
              </div>
              <div className="text-[54px] leading-[60px] tracking-wide text-black mb-[20px] font-bold">
                Big Collection Styles Modern Wear
              </div>
              <div className="border-b-[1px] border-black py-[16px] w-[133.55px] absolute left-[50%] -translate-x-[50%]">
                <a
                  href="#"
                  className="bg-black text-white text-[16px] font-semibold py-[12px] px-[29px] mb-[5px]"
                >
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousel;
