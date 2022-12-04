import React from "react";
import BestDeal from "../components/best-deal/BestDeal";
import BestSellers from "../components/best-sellers/BestSellers";
import Carousel from "../components/carousel/Carousel";
import SpecialOffer from "../components/special-offer/SpecialOffer";
import TopCategories from "../components/top-categories/TopCategories";

const Home = () => {
  return (
    <div className="w-full overflow-hidden">
      <Carousel />
      <TopCategories />
      <SpecialOffer />
      <BestDeal />
      <BestSellers />
    </div>
  );
};

export default Home;
