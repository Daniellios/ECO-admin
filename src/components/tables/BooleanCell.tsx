import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { BooleanField, BooleanFieldProps } from "@pankod/refine-antd";
import React from "react";

const BooleanCell: React.FC<BooleanFieldProps> = ({ ...props }) => {
  return (
    <BooleanField
      {...props}
      trueIcon={<CheckOutlined style={{ color: "#52c41a" }} />}
      falseIcon={<CloseOutlined style={{ color: "#ff4d4f" }} />}
    ></BooleanField>
  );
};

export default BooleanCell;
