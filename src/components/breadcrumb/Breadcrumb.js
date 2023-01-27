import React from "react";

const BreadcrumbComponent = ({ children }) => {
  return (
    <div className="w-full">
      <div className="breadcrumb-container">
        <div className="px-[45px]">{children}</div>
      </div>
    </div>
  );
};

export default BreadcrumbComponent;
