import React, { useState } from "react";
import { Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const LanguageDropDown = ({ className = "" }) => {
  const { i18n } = useTranslation();

  const changeLanguae = (lng) => {
    i18n.changeLanguage(lng);
  };

  const items = [
    {
      label: (
        <div
          onClick={() => {
            setChooseLang("English");
            changeLanguae("en");
          }}
          onMouseDown={() => setArrow(!arrow)}
        >
          English
        </div>
      ),
      key: "0",
    },
    {
      label: (
        <div
          onClick={() => {
            setChooseLang("Vietnamese");
            changeLanguae("vi");
          }}
          onMouseDown={() => setArrow(!arrow)}
        >
          Vietnamese
        </div>
      ),
      key: "1",
    },
  ];
  const [chooseLang, setChooseLang] = useState("English");
  const [arrow, setArrow] = useState(false);

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <div
        className="flex items-center hover-langDropdown"
        onClick={() => setArrow(!arrow)}
        onMouse={() => setArrow(!arrow)}
      >
        <div
          onClick={(e) => e.preventDefault()}
          className={`tracking-wide font-semibold cursor-pointer ${className} transition-all duration-300`}
        >
          {chooseLang}
        </div>
        <DownOutlined
          className={`text-[10px] ml-[6px] transition-all duration-300 ${
            arrow === true ? "rotate-[180deg]" : "rotate-[0deg]"
          } ${className}`}
        />
      </div>
    </Dropdown>
  );
};

export default LanguageDropDown;
