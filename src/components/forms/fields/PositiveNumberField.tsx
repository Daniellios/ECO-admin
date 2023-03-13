import {
  Form,
  FormItemProps,
  InputProps,
  Input,
  InputNumber,
  InputNumberProps,
} from "@pankod/refine-antd";
import React from "react";

interface INumberFieldProps {
  fromItemProps: FormItemProps;
  inputProps: InputNumberProps;
}

const PositiveNumberField: React.FC<INumberFieldProps> = ({
  fromItemProps,
  inputProps,
}) => {
  return (
    <Form.Item
      name={fromItemProps.name}
      style={{ margin: 0 }}
      {...fromItemProps}
      rules={[
        {
          pattern: /^\d*[1-9]\d*$/,
          required: true,
          message: "Числа > 0",
        },
      ]}
    >
      <InputNumber
        onChange={inputProps.onChange}
        placeholder={inputProps.placeholder}
        maxLength={8}
      ></InputNumber>
    </Form.Item>
  );
};

export default PositiveNumberField;
