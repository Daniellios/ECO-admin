import { Form, FormItemProps, Input } from "@pankod/refine-antd";
import React from "react";

const PasswordField: React.FC<FormItemProps> = () => {
  return (
    <Form.Item
      label="Пароль"
      name="password"
      rules={[
        {
          message: "Это обязательное поле",
          required: true,
        },
        {
          message: "От 20 латинских символов содержащих (a A % 4)",
          pattern:
            /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{20,40}$/,
        },
      ]}
    >
      <Input />
    </Form.Item>
  );
};

export default PasswordField;
