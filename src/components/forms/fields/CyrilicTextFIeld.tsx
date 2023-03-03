import { Form, FormItemProps, Input, InputProps } from "@pankod/refine-antd";
import React from "react";

interface ICyrilicTextFieldProps {
  fromItemProps: FormItemProps;
  inputProps: InputProps;
}
const CyrilicTextField: React.FC<ICyrilicTextFieldProps> = ({
  fromItemProps,
  inputProps,
}) => {
  return (
    <Form.Item
      label={fromItemProps.label}
      name={fromItemProps.name}
      {...fromItemProps}
      rules={[
        {
          type: "string",
          message: "Пустое поле",
          required: true,
        },
        {
          message: "Только кирилица",
          pattern: /[\u0401\u0451\u0410-\u044f]/,
        },
        {
          min: 2,
          message: "Более 2 символов",
        },
      ]}
    >
      <Input {...inputProps} type={"text"} />
    </Form.Item>
  );
};

export default CyrilicTextField;
