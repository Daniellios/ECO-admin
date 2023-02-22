import { Col, FormProps, ModalProps, Row } from "@pankod/refine-antd";
import React from "react";
import NameField from "../../forms/fields/NameField";
import PhoneField from "../../forms/fields/PhoneField";
import UserStatusField from "../../forms/fields/UserStatusField";
import ModalActionForm from "../ModalActionForm";

interface UserProfileEditModalFormProps {
  modalProps: ModalProps;
  formProps: FormProps;
}

const UserProfileEditModalForm: React.FC<UserProfileEditModalFormProps> = ({
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
      <Row align="middle" justify="start">
        <Col span={4}>
          <NameField
            label="Имя"
            name={"firstName"}
            required={false}
          ></NameField>
        </Col>

        <Col span={4} push={1}>
          <NameField
            label="Фамилия"
            name={"secondName"}
            required={false}
          ></NameField>
        </Col>

        <Col span={4} push={2}>
          <NameField
            label="Отчество"
            name={"thirdName"}
            required={false}
          ></NameField>
        </Col>
      </Row>

      <Row align="middle" justify="start">
        <Col span={4}>
          <PhoneField required={false}></PhoneField>
        </Col>

        <Col span={4} push={1}>
          <UserStatusField></UserStatusField>
        </Col>
      </Row>
    </ModalActionForm>
  );
};

export default UserProfileEditModalForm;
