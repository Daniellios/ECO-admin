import { Form, FormItemProps, Select } from "@pankod/refine-antd";
import React from "react";

enum UserStatus {
  CONFIRMED = "CONFIRMED",
  BANNED = "BANNED",
  IN_CHECK = "IN_CHECK",
}

const UserStatusField: React.FC<FormItemProps> = ({ ...props }) => {
  return (
    <Form.Item
      {...props}
      label="Статус"
      name="status"
      rules={[
        {
          type: "enum",
          enum: [UserStatus.BANNED, UserStatus.CONFIRMED, UserStatus.IN_CHECK],
          required: false,
        },
      ]}
    >
      <Select
        dropdownMatchSelectWidth={false}
        options={[
          {
            label: "Подтвержден",
            value: "CONFIRMED",
          },
          {
            label: "В проверке",
            value: "IN_CHECK",
          },
          {
            label: "Забанен",
            value: "BANNED",
          },
        ]}
      />
    </Form.Item>
  );
};

export default UserStatusField;
