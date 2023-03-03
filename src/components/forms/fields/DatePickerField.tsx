import {
  DatePicker,
  DatePickerProps,
  Form,
  FormItemProps,
} from "@pankod/refine-antd";
import React from "react";

interface IDatePickerFieldProps {
  fromItemProps: FormItemProps;
  datePickerProps: DatePickerProps;
}

const DatePickerField: React.FC<IDatePickerFieldProps> = ({
  datePickerProps,
  fromItemProps,
}) => {
  const handleDatePick: DatePickerProps["onChange"] = (date) => {
    return date?.get("d");
  };

  return (
    <Form.Item name={fromItemProps.name} {...fromItemProps}>
      <DatePicker
        onChange={handleDatePick}
        format="DD/MM/YYYY"
        placeholder={
          datePickerProps.placeholder ? datePickerProps.placeholder : "Дата"
        }
        {...datePickerProps}
      ></DatePicker>
    </Form.Item>
  );
};

export default DatePickerField;
