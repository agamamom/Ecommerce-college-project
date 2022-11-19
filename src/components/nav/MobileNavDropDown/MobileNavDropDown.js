import { Menu } from "antd";
import React, { useState } from "react";
import "../../../../src/index.scss";
import { useHistory } from "react-router-dom";
import LanguageDropdown from "../LanguageDropdown/LanguageDropdown";
import { BsPercent } from "react-icons/bs";

function GetItem(label, key, children, type, link) {
  return {
    key,
    children,
    label,
    type,
    link,
  };
}

const items = [
  GetItem("Home", "sub1"),
  GetItem("Navigation Two", "sub2", [
    GetItem("Option 5", "5"),
    GetItem("Option 6", "6"),
  ]),
  GetItem("Navigation Three", "sub4", [
    GetItem("Option 9", "9"),
    GetItem("Option 10", "10"),
    GetItem("Option 11", "11"),
    GetItem("Option 12", "12"),
  ]),
];

// submenu keys of first level
const rootSubmenuKeys = ["sub2", "sub4"];
const MobileNavDropDown = () => {
  const [openKeys, setOpenKeys] = useState([""]);
  const [currentLang, setCurrentLang] = useState("en");
  let history = useHistory();

  const handleLang = (lang) => {
    setCurrentLang(lang);
  };

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    // console.log("latestOpenKey", latestOpenKey);
    // console.log("keys", keys);
    // console.log("openKeys", openKeys);
    // console.log("latestOpenKey", rootSubmenuKeys.indexOf(latestOpenKey));
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const onSelectChange = (keys2) => {
    console.log("keys2", keys2.key);
    const handleNavigate = () => {
      if (keys2.key === "5") {
        history.push("/login5");
      } else if (keys2.key === "6") {
        history.push("/login6");
      }
    };
    return handleNavigate();
  };
  return (
    <>
      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        onClick={onSelectChange}
        style={{
          width: "100%",
        }}
        items={items}
        selectable={true}
      />
      <div className="flex flex-col items-center justify-center py-[15px] bg-white">
        <div className="flex w-[240px] justify-between">
          <div className="">
            <LanguageDropdown />
          </div>
          <div className="relative">
            <div className="w-[0.4px] h-[100%] left-[50%] text-[#5E5C5C] bg-[#5E5C5C] -translate-x-[50%]"></div>
          </div>
          <div className="flex items-center ">
            <BsPercent className="text-[#ff5635] mr-[6px] " />
            <div className="text-[#ff5635] tracking-wide font-semibold">
              Clearance Sales
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MobileNavDropDown;
