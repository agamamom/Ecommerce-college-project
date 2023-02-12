import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import ProductBS from "../product-specialOffer/ProductBS";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import LoadingCard from "../cards/LoadingCard";
import {
  getRandomTelevisionAndMonitor,
  getRandomNetworkingAndLaptop,
  getRandomDigitalCameraAndGPS,
} from "../../functions/product";

const AntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
  })
);
// div className="mr-[44px] text-[22px] font-normal flex-shrink-0 leading-[35px] pb-[8.8px] relative BestSellers-nav-link active"
const AntTabTitle = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontSize: 22,
    fontWeight: 400,
    lineHeight: 35,
  })
);
{
  /* <div className="border-[2px] border-[#fed400] rounded-[20px] px-[16px] py-[2px] text-[16px] font-semibold"></div> */
}
const AntTabTop20 = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
  })
);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const BestSellers = () => {
  const [value, setValue] = React.useState(2);
  const [teleAndMoniProducts, setTeleAndMoniProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    // sort, order, limit
    getRandomTelevisionAndMonitor().then((res) => {
      setTeleAndMoniProducts(res.data);
      setLoading(false);
    });
  };

  console.log("setTeleAndMoniProducts", teleAndMoniProducts);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="bg-white px-[45px] mt-[40px] bestSellers-line">
      <div className="w-[100%]">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
          >
            <AntTabTitle label="Best Sellers" {...a11yProps(0)} disabled />
            <AntTabTop20 label="Top 8" {...a11yProps(1)} disabled />
            <AntTab label="Televisions & Monitor" {...a11yProps(2)} />
            {/* <Tab label="Smart Phones & Tablets"  /> */}
            <AntTab label="Networking & Laptops" {...a11yProps(3)} />
            <AntTab label="Video Cameras" {...a11yProps(4)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={2}>
          <Swiper slidesPerView={1} spaceBetween={30} className="mySwiper">
            <SwiperSlide>
              {loading ? (
                <LoadingCard count={8} />
              ) : (
                <div className="grid grid-cols-4">
                  {teleAndMoniProducts &&
                    teleAndMoniProducts.map((product) => (
                      <div key={product._id}>
                        <ProductBS
                          productBorderRight="product"
                          product={product}
                        />
                      </div>
                    ))}
                </div>
              )}
            </SwiperSlide>
          </Swiper>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <SwiperSlide>Slide 2</SwiperSlide>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <SwiperSlide>Slide 3</SwiperSlide>
        </TabPanel>
      </div>
      <div className="mb-[39px] mt-[50px]">
        <a href="#">
          <img
            src="	https://electro.madrasthemes.com/wp-content/uploads/2018/04/home-v5-banner.png"
            alt=""
            className="max-w-full h-auto"
          />
        </a>
      </div>
    </div>
  );
};

export default BestSellers;
