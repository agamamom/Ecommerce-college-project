import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import {
  fadeInLeft,
  fadeIn2,
  fadeIn3,
  fadeIn4,
  staggerTextContainer,
} from "../../variants";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";

const Carousel = () => {
  return (
    <div className="h-[400px] carousel-container">
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper h-full"
      >
        <SwiperSlide>
          <motion.div
            variants={staggerTextContainer}
            initial="initial"
            whileInView={"animate"}
            viewport={{ once: false, amount: 0.1 }}
            className="relative h-[100%]"
          >
            <img src="/images/carousel/anhnencarousel.jpg" alt="" />
            <div className="absolute bottom-[33%] max-w-[546px] left-[33%] -translate-x-[50%] text-center">
              <motion.div variants={fadeIn2} className="shoptoget-text">
                SHOP TO GET WHAT YOU LOVE
              </motion.div>
              <motion.div variants={fadeIn3} className="timepieces-text">
                TIMEPIECES THAT
                <br /> MAKE A STATEMENT
                <br /> UP TO <strong className="font-medium">40% OFF</strong>
              </motion.div>
              <motion.div
                variants={fadeIn4}
                className="border-b-[1px] border-[#fff] py-[16px] w-[133.55px] absolute mt-[10px] -translate-x-[50%]"
              >
                <a
                  href="#"
                  className="bg-[#fff] text-[#111111] text-[16px] font-semibold py-[12px] px-[29px] mb-[5px]"
                >
                  Shop Now
                </a>
              </motion.div>
            </div>

            <motion.img
              variants={fadeInLeft}
              src="/images/carousel/carousel-watch.png"
              alt=""
              className="absolute -top-[10%] -translate-y-[50%] left-[50%]  "
            />
          </motion.div>
        </SwiperSlide>
        <SwiperSlide>
          <motion.div
            variants={staggerTextContainer}
            initial="initial"
            whileInView={"animate"}
            viewport={{ once: false, amount: 0.1 }}
            className="relative h-[100%]"
          >
            <img src="/images/carousel/anhnencarousel.jpg" alt="" />
            <div className="absolute bottom-[33%] max-w-[546px] left-[33%] -translate-x-[50%] text-center">
              <motion.div variants={fadeIn2} className="shoptoget-text">
                SHOP TO GET WHAT YOU LOVE
              </motion.div>
              <motion.div variants={fadeIn3} className="timepieces-text">
                TIMEPIECES THAT
                <br /> MAKE A STATEMENT
                <br /> UP TO <strong className="font-medium">40% OFF</strong>
              </motion.div>
              <motion.div
                variants={fadeIn4}
                className="border-b-[1px] border-[#fff] py-[16px] w-[133.55px] absolute mt-[10px] -translate-x-[50%]"
              >
                <a
                  href="#"
                  className="bg-[#fff] text-[#111111] text-[16px] font-semibold py-[12px] px-[29px] mb-[5px]"
                >
                  Shop Now
                </a>
              </motion.div>
            </div>

            <motion.img
              variants={fadeInLeft}
              src="/images/carousel/Smartphones-carousel.png"
              alt=""
              className="absolute -top-[10%] -translate-y-[50%] left-[50%]  "
            />
          </motion.div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousel;
