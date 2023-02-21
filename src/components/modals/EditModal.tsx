import { Form, FormProps, Modal, ModalProps } from "@pankod/refine-antd";
import React from "react";

interface EditModalProps {
  modalProps: ModalProps;
  formProps: FormProps;
  children: React.ReactNode;
}

const EditModal: React.FC<EditModalProps> = ({
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

export default EditModal;
