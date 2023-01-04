import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ProductSO from "../product-specialOffer/ProductSO";
import { getProductsByCount } from "../../functions/product";
import LoadingCard from "../cards/LoadingCard";

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
  const [value, setValue] = React.useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(7).then(async (res) => {
      await setProducts(res.data);
      setLoading(false);
    });
  };
  console.log("products", products);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="px-[45px] mt-[40px]">
      <div className="grid grid-cols-12 gap-[30px]">
        <div className="col-span-3">
          <div className="border-[#fed700] border-[2px] rounded-[1.214em] px-[1.571em] py-[1.429em]">
            <header>
              <h2 class="text-[25px]">Special Offer</h2>
            </header>
            <div>
              <a href="#" className="text-[#333e48] no-underline">
                <div className="mb-[1.714em]">
                  <img
                    src="/images/special-offer/xbox.png"
                    width="300"
                    height="300"
                    className="max-w-full mx-auto my-auto"
                    alt=""
                  />
                </div>
                <h2 class="clear-both text-center mb-[1.214em] font-bold text-[#0062bd] text-[1em] leading-[1.28572em] h-[2.57144em]">
                  Game Console Controller + USB 3.0 Cable
                </h2>
              </a>
              <span className="text-center text-[2.143em] block w-full mb-[17px]">
                <span class="woocommerce-Price-currencySymbol">$</span>99.00
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
                <Tab label="Most Viewed" {...a11yProps(0)} />
                <Tab label="On Sale" {...a11yProps(1)} />
                <Tab label="Top Rated" {...a11yProps(2)} />
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
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
              Item Three
            </TabPanel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialOffer;
