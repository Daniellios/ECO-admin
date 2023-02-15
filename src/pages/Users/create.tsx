import React from "react";
import { HttpError, IResourceComponentsProps } from "@pankod/refine-core";

import {
  Create,
  Form,
  Input,
  Select,
  useForm,
  useSelect,
} from "@pankod/refine-antd";

import { IUser } from "../../interfaces";

export const UserCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps } = useForm<IUser, HttpError>({
    // warnWhenUnsavedChanges: true,
  });

  return (
    <Create title="Создание аккаунта экогола">
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
      </Form>
    </Create>
  );
};
