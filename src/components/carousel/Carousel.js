import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";

const Carousel = () => {
  return (
    <div className="h-[calc(100vh-112px)]">
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper h-full"
      >
        <SwiperSlide>
          <div className="">
            <img src="/images/carousel/carousel1.jpg" alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousel;
