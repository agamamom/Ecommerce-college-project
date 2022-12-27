import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ProductSO from "../product-specialOffer/ProductSO";

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
                onChange={handleChange}
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
                <div className="grid grid-cols-4 products">
                  <ProductSO
                    categories="Audio Speakers"
                    name="Wireless Audio System Multiroom 360"
                    pic="https://electro.madrasthemes.com/wp-content/uploads/2016/03/WirelessSound-300x300.png"
                    price="$2,299.00"
                    productBorderRight="product"
                  />
                  <ProductSO
                    categories="Laptop, Ultrabooks"
                    name="Tablet Red EliteBook Revolve 810 G2"
                    pic="	https://electro.madrasthemes.com/wp-content/uploads/2016/03/apptablet-300x300.png"
                    price="$2,100.00"
                    productBorderRight="product"
                  />
                  <ProductSO
                    categories="Headphones"
                    name="White Solo 2 Wireless"
                    pic="https://electro.madrasthemes.com/wp-content/uploads/2016/03/uniheadphone-300x300.png"
                    price="$248.00"
                    productBorderRight="product"
                  />
                  <ProductSO
                    categories="Smartphone"
                    name="Smartphone 6S 32GB LTE"
                    pic="https://electro.madrasthemes.com/wp-content/uploads/2016/03/GoldPhone-1-300x300.png"
                    price="$1,109.00"
                    productBorderRight="product"
                  />
                  <ProductSO
                    categories="Cameras"
                    name="Purple NX Mini F1 aparat SMART NX"
                    pic="https://electro.madrasthemes.com/wp-content/uploads/2016/03/camera2-300x300.png"
                    price="$558.00"
                    productBorderRight="product"
                  />
                  <ProductSO
                    categories="Game Console, Gaming"
                    name="GameConsole Destiny Special Edition"
                    pic="https://electro.madrasthemes.com/wp-content/uploads/2016/03/game1-300x300.png"
                    price="$109.00"
                    productBorderRight="product"
                  />
                  <ProductSO
                    categories="Printers"
                    name="Full Color LaserJet Pro M452dn"
                    pic="https://electro.madrasthemes.com/wp-content/uploads/2016/03/printer-300x300.png"
                    price="$1,094.00"
                    productBorderRight="product"
                  />
                  <ProductSO
                    categories="Cameras"
                    name="Camera C430W 4k Waterproff"
                    pic="	https://electro.madrasthemes.com/wp-content/uploads/2016/03/videocamera-300x300.png"
                    price="$590.00"
                    productBorderRight="product"
                  />
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
