import { Form, FormItemProps, Input } from "@pankod/refine-antd";
import React from "react";

const PhoneField: React.FC<FormItemProps> = () => {
  return (
    <Form.Item
      label="Телефон"
      name="phone"
      rules={[
        {
          message: "Это обязательное поле",
          required: true,
        },
        {
          pattern: /(?<=^|\s|>|\;|\:|\))(?:\+|7|\()[\d\-\(\) ]{10,}\d/,
          message: "Телефон в формате +79998886655",
        },
      ]}
    >
      <Input defaultValue={"+7"} />
    </Form.Item>
  );
};

export default PhoneField;
