import { DatePicker, DatePickerProps } from "@pankod/refine-antd";
import React from "react";

const DatePickerField: React.FC<DatePickerProps> = ({ ...props }) => {
  const handleDatePick: DatePickerProps["onChange"] = (date) => {
    console.log(date);

    return date?.get("d");
  };

  return (
    <DatePicker
      onChange={handleDatePick}
      placeholder={props.placeholder ? props.placeholder : "Дата"}
      {...props}
    ></DatePicker>
  );
};

export default DatePickerField;
