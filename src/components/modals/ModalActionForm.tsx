import { Form, FormProps, Modal, ModalProps } from "@pankod/refine-antd";
import React from "react";

interface ModalActionFormProps {
  modalProps: ModalProps;
  formProps: FormProps;
  children: React.ReactNode;
}

const ModalActionForm: React.FC<ModalActionFormProps> = ({
  children,
  modalProps,
  formProps,
}) => {
  return (
    <Modal
      {...modalProps}
      cancelText="Отмена"
      okText="Сохранить"
      closable={true}
    >
      <Form {...formProps} layout="vertical" size="small">
        {children}
      </Form>
    </Modal>
  );
};

export default ModalActionForm;
