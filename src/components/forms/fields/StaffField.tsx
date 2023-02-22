import { Form, FormItemProps, Select } from "@pankod/refine-antd";
import React from "react";

enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  COMPANY = "COMPANY",
}

interface StaffFieldProps {
  fromItem?: FormItemProps;
  role: boolean;
}

const StaffField: React.FC<StaffFieldProps> = ({ role, fromItem }) => {
  return (
    <Form.Item
      {...fromItem}
      label="Роль"
      name="roles"
      rules={[
        {
          message: "Это обязательное поле",
          required: true,
        },
        {
          type: "enum",
          enum: [Role.ADMIN, Role.MANAGER],
        },
      ]}
    >
      <Select
        dropdownMatchSelectWidth={false}
        defaultValue={"MANAGER"}
        options={
          role
            ? [
                {
                  label: "Админ",
                  value: "ADMIN",
                },
                {
                  label: "Менеджер",
                  value: "MANAGER",
                },
              ]
            : [
                {
                  label: "Менеджер",
                  value: "MANAGER",
                },
              ]
        }
      />
    </Form.Item>
  );
};

export default StaffField;
