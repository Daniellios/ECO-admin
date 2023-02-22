import { Form, FormProps, ModalProps, Select } from "@pankod/refine-antd";
import React from "react";
import ModalActionForm from "../ModalActionForm";

interface UserSkillEditModalFormProps {
  modalProps: ModalProps;
  formProps: FormProps;
}

const UserSkillEditModalForm: React.FC<UserSkillEditModalFormProps> = ({
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
        label="Готовность"
        name="isCompleted"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Select
          options={[
            {
              label: "Заполнена",
              value: true,
            },
            {
              label: "Не заполнена",
              value: false,
            },
          ]}
        ></Select>
      </Form.Item>
    </ModalActionForm>
  );
};

export default UserSkillEditModalForm;
