import { PlusCircleOutlined } from "@ant-design/icons";
import { Create, Form, Input, useForm } from "@pankod/refine-antd";
import {
  HttpError,
  IResourceComponentsProps,
  useResource,
} from "@pankod/refine-core";
import MySaveButton from "../../components/buttons/MySaveButton";
import { IStaffMember } from "../../interfaces";

export const StaffCreate: React.FC<IResourceComponentsProps> = () => {
  const { resource } = useResource();

  const { formProps, form, onFinish } = useForm<IStaffMember, HttpError>({
    submitOnEnter: true,
    successNotification: {
      message: "Содтрудник успешно создан",
      type: "success",
    },
  });

  const onHandleSubmit = () => {
    form.validateFields();
    const values = form.getFieldsValue();
    onFinish(values);
  };

  return (
    <Create
      title="Создание нового сотрудника"
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
