import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ProductSO from "../product-specialOffer/ProductSO";
import { getRandomProducts } from "../../functions/product";
import LoadingCard from "../cards/LoadingCard";
import { useTranslation } from "react-i18next";

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

const SpecialOffer = () => {
   const { t } = useTranslation();

   const [value, setValue] = React.useState(0);
   const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(false);

   const TopRated = t("special offer.Top Rated");

   useEffect(() => {
      loadAllProducts();
   }, []);

   const loadAllProducts = () => {
      setLoading(true);
      // sort, order, limit
      getRandomProducts().then((res) => {
         setProducts(res.data);
         setLoading(false);
      });
   };

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };
   return (
      <div className="px-[45px] mt-[40px]">
         <div className="grid grid-cols-12 gap-[30px]">
            <div className="col-span-3">
               <div className="border-[#fed700] border-[2px] rounded-[1.214em] px-[1.571em] py-[1.429em]">
                  <header>
                     <h2 className="text-[25px]">
                        {t("special offer.Special Offer")}
                     </h2>
                  </header>
                  <div>
                     <a href="#" className="text-[#333e48] no-underline">
                        <div className="mb-[1.714em]">
                           <img
                              src="/images/special-offer/game1-300x300.png"
                              width="300"
                              height="300"
                              className="max-w-full mx-auto my-auto"
                              alt=""
                           />
                        </div>
                        <h2 className="clear-both text-center mb-[1.214em] font-bold text-[#0062bd] text-[1em] leading-[1.28572em] h-[2.57144em]">
                           {t("special offer.Game Console")}
                        </h2>
                     </a>
                     <span className="text-center text-[2.143em] block w-full mb-[17px]">
                        <span className="woocommerce-Price-currencySymbol">
                           $
                        </span>
                        99.00
                     </span>
                  </div>
               </div>
               <div className="mt-[10px]">
                  <img
                     src="https://electro.madrasthemes.com/wp-content/uploads/2019/04/two-banner-01.jpg"
                     alt=""
                     className="mb-[10px]"
                  />
                  <img
                     src="https://electro.madrasthemes.com/wp-content/uploads/2019/04/two-banner-02.jpg"
                     alt=""
                  />
                  <img
                     src="/images/special-offer/payment.jpg"
                     alt=""
                     className="mt-[10px]"
                  />
                  <img
                     src="/images/picture-sidebar1.png"
                     alt=""
                     className="mt-[10px]"
                  />
                  <img
                     src="/images/picture-sidebar2.png"
                     alt=""
                     className="mt-[10px]"
                  />
               </div>
            </div>
            <div className="col-span-9 special-offer-right">
               <div>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                     <Tabs
                        value={value}
                        onChange={() => handleChange()}
                        aria-label="basic tabs example"
                        centered
                     >
                        <Tab label={TopRated} {...a11yProps(0)} />
                     </Tabs>
                  </Box>
                  <TabPanel value={value} index={0}>
                     <div className="">
                        <div className="">
                           {loading ? (
                              <LoadingCard count={8} />
                           ) : (
                              <div className="grid grid-cols-4 products">
                                 {products &&
                                    products.map((product) => (
                                       <div key={product._id}>
                                          <ProductSO
                                             height="h-full"
                                             productBorderRight="product"
                                             product={product}
                                          />
                                       </div>
                                    ))}
                              </div>
                           )}
                        </div>
                     </div>
                  </TabPanel>
               </div>
            </div>
         </div>
      </div>
   );
};

export default SpecialOffer;
