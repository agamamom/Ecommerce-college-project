import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import ProductSO from "../product-specialOffer/ProductSO";

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
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="bg-white px-[45px] mt-[40px] bestSellers-line">
      <div className="w-[100%] bg-red-50">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
          >
            <AntTabTitle label="Best Sellers" {...a11yProps(0)} />
            <AntTabTop20 label="Top 20" {...a11yProps(1)} disabled />
            <AntTab label="Smart Phones & Tablets" {...a11yProps(2)} />
            {/* <Tab label="Smart Phones & Tablets"  /> */}
            <AntTab label="Laptops & Computers" {...a11yProps(3)} />
            <AntTab label="Video Cameras" {...a11yProps(4)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          hello
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </div>
    </div>
  );
};

export default BestSellers;
