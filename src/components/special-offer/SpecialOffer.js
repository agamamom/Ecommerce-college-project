import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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
                <Tab label="Featured" {...a11yProps(0)} />
                <Tab label="On Sale" {...a11yProps(1)} />
                <Tab label="Top Rated" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <div className="">
                <div className="grid grid-cols-4">
                  <div className="h-full">
                    <div className="px-[24px] pt-[20px] pb-[14px]">
                      <div className="relative">
                        <span class="mb-[12px] text-[12px] leading-[13px] h-[13px]">
                          <a href="#" rel="tag" className="text-[#768b9e]">
                            Audio Speakers
                          </a>
                        </span>
                        <a href="#" class="block">
                          <h2 class="text-[14px] leading-[18px] h-[36px]">
                            Wireless Audio System Multiroom 360
                          </h2>
                          <div class="mb-[10px] w-full relative">
                            <img
                              width="300"
                              height="300"
                              src="https://electro.madrasthemes.com/wp-content/uploads/2016/03/WirelessSound-300x300.png"
                              class="max-w-[100%] max-h-[100%] w-auto h-auto m-auto align-middle"
                              alt=""
                              loading="lazy"
                            />
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
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
