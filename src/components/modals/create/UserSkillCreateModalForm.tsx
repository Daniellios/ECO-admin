import { Form, FormProps, ModalProps, Select } from "@pankod/refine-antd";
import React from "react";
import ModalActionForm from "../ModalActionForm";

interface UserSkillCreateModalFormProps {
  modalProps: ModalProps;
  formProps: FormProps;
}

const UserSkillCreateModalForm: React.FC<UserSkillCreateModalFormProps> = ({
  modalProps,
  formProps,
}) => {
  return (
    <ModalActionForm
      modalProps={{
        ...modalProps,
        title: modalProps.title,
      }}
      formProps={formProps}
    >
      <Form.Item
        label="Есть высшее образование"
        name="hasDegree"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Select
          options={[
            {
              label: "Да",
              value: true,
            },
            {
              label: "Нет",
              value: false,
            },
          ]}
        ></Select>
      </Form.Item>
    </ModalActionForm>
  );
};

export default UserSkillCreateModalForm;
