import React from "react";
import {
  HttpError,
  IResourceComponentsProps,
  useResource,
} from "@pankod/refine-core";

import {
  Create,
  Form,
  Input,
  Select,
  useForm,
  useSelect,
} from "@pankod/refine-antd";

import { IUser } from "../../interfaces";
import MySaveButton from "../../components/buttons/MySaveButton";
import { PlusCircleOutlined } from "@ant-design/icons";

export const UserCreate: React.FC<IResourceComponentsProps> = () => {
  const { resource } = useResource();

  const {
    formProps,
    saveButtonProps,
    queryResult,
    formLoading,
    form,
    onFinish,
  } = useForm<IUser, HttpError>({
    submitOnEnter: true,
    successNotification: { message: "Эколог успешно создан", type: "success" },
  });

  const onHandleSubmit = () => {
    form.validateFields();
    const values = form.getFieldsValue();
    onFinish(values);
  };

  return (
    <Create
      title="Создание аккаунта экогола"
      footerButtons={
        <MySaveButton
          resource={resource.name}
          title="Создать"
          icon={<PlusCircleOutlined />}
          onClick={onHandleSubmit}
        ></MySaveButton>
      }
    >
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Почта"
          name="email"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Create>
  );
};
