import {
  Form,
  FormItemProps,
  InputProps,
  Input,
  InputNumber,
} from "@pankod/refine-antd";
import React from "react";

interface INumberFieldProps {
  fromItemProps: FormItemProps;
  inputProps: InputProps;
}

const PositiveNumberField: React.FC<INumberFieldProps> = ({
  fromItemProps,
  inputProps,
}) => {
  return (
    <Form.Item
      name={fromItemProps.name}
      initialValue={1}
      style={{ margin: 0 }}
      {...fromItemProps}
      rules={[
        {
          pattern: /^\d*[1-9]\d*$/,
          required: true,
          message: "Целые числа больше 0",
        },
      ]}
    >
      <InputNumber placeholder={inputProps.placeholder}></InputNumber>
    </Form.Item>
  );
};

export default PositiveNumberField;
