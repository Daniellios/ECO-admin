import { Form, FormItemProps, Input } from "@pankod/refine-antd";
import React from "react";

const NameField: React.FC<FormItemProps> = ({ label, name, ...props }) => {
  return (
    <Form.Item
      {...props}
      label={label}
      name={name}
      rules={[
        {
          type: "string",
          message: "Поле не должно быть пустым",
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
        {
          max: 60,
          message: "Не более 60 символов",
        },
      ]}
    >
      <Input />
    </Form.Item>
  );
};

export default NameField;
