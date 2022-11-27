import React from "react";
import Carousel from "../components/carousel/Carousel";
import TopCategories from "../components/top-categories/TopCategories";

const Home = () => {
  return (
    <div className="w-full overflow-hidden">
      <Carousel />
      <TopCategories />
    </div>
  );
};

export default Home;
