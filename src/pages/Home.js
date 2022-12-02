import React from "react";
import Carousel from "../components/carousel/Carousel";
import SpecialOffer from "../components/special-offer/SpecialOffer";
import TopCategories from "../components/top-categories/TopCategories";

const Home = () => {
  return (
    <div className="w-full overflow-hidden">
      <Carousel />
      <TopCategories />
      <SpecialOffer />
    </div>
  );
};

export default Home;
