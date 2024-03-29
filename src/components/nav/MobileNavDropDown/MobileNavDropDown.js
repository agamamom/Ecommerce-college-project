import { Menu } from "antd";
import React, { useState } from "react";
import "../../../../src/index.scss";
import { useNavigate } from "react-router-dom";
import LanguageDropdown from "../LanguageDropdown/LanguageDropdown";
import { BsPercent } from "react-icons/bs";
import { MdPhoneInTalk } from "react-icons/md";
import { IoMailOpen } from "react-icons/io5";
import { useTranslation } from "react-i18next";
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
   const { t } = useTranslation();
   const [openKeys, setOpenKeys] = useState([""]);
   const navigate = useNavigate();

   const onOpenChange = (keys) => {
      const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

      if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
         setOpenKeys(keys);
      } else {
         setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
      }
   };
   const onSelectChange = (keys2) => {
      const handleNavigate = () => {
         if (keys2.key === "5") {
            navigate("/login5");
         } else if (keys2.key === "6") {
            navigate("/login6");
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
                  <BsPercent className="text-[#ff5635] mr-[6px]" />
                  <div className="text-[#ff5635] tracking-wide font-semibold">
                     {t("clearence sales")}
                  </div>
               </div>
            </div>
            <div className="flex w-[316px] justify-between mt-[12px]">
               <div className="flex items-center">
                  <MdPhoneInTalk />
                  <div className="tracking-wide ml-[6px]">+01-987-654-3210</div>
               </div>
               <div className="relative">
                  <div className="w-[0.4px] h-[100%] left-[50%] text-[#5E5C5C] bg-[#5E5C5C] -translate-x-[50%]"></div>
               </div>
               <div className="flex items-center">
                  <IoMailOpen />
                  <div className="tracking-wide ml-[6px]">
                     contact@store.com
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};
export default MobileNavDropDown;
