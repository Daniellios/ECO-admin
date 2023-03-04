import { CloudOutlined } from "@ant-design/icons";
import React from "react";

interface IHeaderProprs {
  collapsed: boolean;
}
const CustomTitle: React.FC<IHeaderProprs> = ({ collapsed }) => {
  return (
    <div className="header_logo">
      {collapsed ? (
        <CloudOutlined className="header_logo_title" />
      ) : (
        <span className="header_logo_title">ВИЭКО</span>
      )}
    </div>
  );
};

export default CustomTitle;
