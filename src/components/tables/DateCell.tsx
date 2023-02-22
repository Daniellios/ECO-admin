import { DateField, DateFieldProps } from "@pankod/refine-antd";
import React from "react";

const DateCell: React.FC<DateFieldProps> = ({ ...props }) => {
  return (
    <DateField defaultValue={"Не указана"} value={props.value}></DateField>
  );
};

export default DateCell;
