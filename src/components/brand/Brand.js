import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper";

const Brand = () => {
  return (
    <div className="px-[45px] py-[30px] brand-section">
      <div className="border-t-[1px] border-b-[1px] border-[#ddd] py-[18px]">
        <Swiper
          navigation={true}
          slidesPerView={5}
          loop={true}
          loopFillGroupWithBlank={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Navigation, Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div>
              <img
                src="https://electro.madrasthemes.com/wp-content/uploads/2021/03/themeforest4.png"
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <img
                src="https://electro.madrasthemes.com/wp-content/uploads/2021/03/themeforest5.png"
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <img
                src="https://electro.madrasthemes.com/wp-content/uploads/2021/03/themeforest6.png"
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <img
                src="https://electro.madrasthemes.com/wp-content/uploads/2021/03/themeforest1.png"
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <img
                src="https://electro.madrasthemes.com/wp-content/uploads/2021/03/themeforest2.png"
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <img
                src="https://electro.madrasthemes.com/wp-content/uploads/2021/03/themeforest3.png"
                alt=""
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Brand;
