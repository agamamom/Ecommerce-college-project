import React from "react";
import BestDeal from "../components/best-deal/BestDeal";
import BestSellers from "../components/best-sellers/BestSellers";
import Brand from "../components/brand/Brand";
import Carousel from "../components/carousel/Carousel";
import Footer from "../components/footer/Footer";
import Newletter from "../components/newletter/Newletter";
import SpecialOffer from "../components/special-offer/SpecialOffer";
import TopCategories from "../components/top-categories/TopCategories";
import ScrollToTop from "react-scroll-to-top";

const Home = () => {
  return (
    <div className="w-full">
      <Carousel />
      <TopCategories />
      <SpecialOffer />
      <BestDeal />
      <BestSellers />
      <Brand />
      <Newletter />
      <Footer />
      <ScrollToTop smooth />
    </div>
  );
};

export default Home;
