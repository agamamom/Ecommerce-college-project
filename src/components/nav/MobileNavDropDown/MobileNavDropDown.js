import { Menu } from "antd";
import React, { useState } from "react";
import "../../../../src/index.scss";
import { useHistory } from "react-router-dom";

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
const rootSubmenuKeys = ["sub1", "sub2", "sub4"];
const MobileNavDropDown = () => {
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{
        width: "100%",
      }}
      items={items}
    />
  );
};
export default MobileNavDropDown;
