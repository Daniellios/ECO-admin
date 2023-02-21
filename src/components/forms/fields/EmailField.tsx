import { Form, FormItemProps, Input } from "@pankod/refine-antd";
import React from "react";

const EmailField: React.FC<FormItemProps> = () => {
  return (
    <Form.Item
      label="Почта"
      name="email"
      required={true}
      rules={[
        {
          message: "Это обязательное поле",
          required: true,
        },
        {
          message: "Неверный формат почты",
          type: "email",
        },
      ]}
    >
      <Input />
    </Form.Item>
  );
};

export default EmailField;
