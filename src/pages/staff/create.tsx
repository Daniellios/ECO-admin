import { PlusCircleOutlined } from "@ant-design/icons";
import { Create, Form, Input, Select, useForm } from "@pankod/refine-antd";
import {
  HttpError,
  IResourceComponentsProps,
  usePermissions,
  useResource,
} from "@pankod/refine-core";
import MySaveButton from "../../components/buttons/MySaveButton";
import EmailField from "../../components/forms/fields/EmailField";
import NameField from "../../components/forms/fields/NameField";
import PasswordField from "../../components/forms/fields/PasswordField";
import PhoneField from "../../components/forms/fields/PhoenField";

import { IStaffMember } from "../../interfaces";
// import { useForm, Controller} from "@pankod/refine-react-hook-form";

enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  COMPANY = "COMPANY",
}

export const StaffCreate: React.FC<IResourceComponentsProps> = () => {
  const { resource } = useResource();

  const { data: identity } = usePermissions({});
  const isAdmin = identity?.roles === "ADMIN";

  const { formProps, form, onFinish } = useForm<IStaffMember, HttpError>({
    submitOnEnter: true,
    successNotification: {
      message: "Содтрудник успешно создан",
      type: "success",
    },
    errorNotification: (error?, values?, resource?) => {
      return {
        message: `error`,
        description: `${error}`,
        type: "error",
      };
    },
  });

  const onHandleSubmit = async () => {
    await form
      .validateFields()
      .then(() => {
        const values = form.getFieldsValue();
        onFinish(values);
      })
      .catch((errorfields) => {
        form.getFieldError(errorfields);
      });
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
      <Form
        {...formProps}
        layout="vertical"
        labelCol={{ span: 1 }}
        wrapperCol={{ span: 10 }}
      >
        <NameField label="Имя" name="firstName"></NameField>
        <NameField label="Фамилия" name="secondName"></NameField>

        <EmailField />

        <PhoneField />

        <PasswordField />

        <Form.Item
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
              isAdmin
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
      </Form>
    </Create>
  );
};
