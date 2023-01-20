import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ListView from "./ListView";
import GridView from "./GridView";
import { HiViewGrid } from "react-icons/hi";
import { HiViewList } from "react-icons/hi";

var slugify = require("slugify");

const ListProductType = ({ slug, allProductByCategory }) => {
  const title = slugify(slug, { replacement: " " });

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <div className="grid grid-cols-2">
        <div className="text-left text-[25px] leading-[40px] uppercase">
          {title}
        </div>
        <div className="text-right">
          Showing all {allProductByCategory.length} results
        </div>
      </div>
      <div className="w-full ChangeView">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab icon={<HiViewGrid />} value="1" />
                <Tab icon={<HiViewList />} value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <ListView slug={slug} />
            </TabPanel>
            <TabPanel value="2">
              <GridView slug={slug} />
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
};

export default ListProductType;
