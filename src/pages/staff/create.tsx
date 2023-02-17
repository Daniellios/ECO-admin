import { PlusCircleOutlined } from "@ant-design/icons";
import { Create, Form, Input, Select, useForm } from "@pankod/refine-antd";
import {
  HttpError,
  IResourceComponentsProps,
  useResource,
} from "@pankod/refine-core";
import MySaveButton from "../../components/buttons/MySaveButton";
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

  const { formProps, form, onFinish, queryResult } = useForm<
    IStaffMember,
    HttpError
  >({
    // refineCoreProps: {}

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
        <Form.Item
          label="Имя"
          name="firstName"
          rules={[
            {
              type: "string",
              message: "Поле не должно быть пустым",
              required: true,
            },
            {
              message: "Только кирилица",
              pattern: /[\u0401\u0451\u0410-\u044f]/,
            },
            {
              min: 2,
              message: "Более 2 символов",
            },
            {
              max: 60,
              message: "Не более 60 символов",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Фамилия"
          name="secondName"
          rules={[
            {
              type: "string",
              message: "Поле не должно быть пустым",
              required: true,
            },
            {
              message: "Только кирилица",
              pattern: /[\u0401\u0451\u0410-\u044f]/,
            },
            {
              min: 2,
              message: "Более 2 символов",
            },
            {
              max: 60,
              message: "Не более 60 символов",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Почта"
          name="email"
          required={true}
          rules={[
            {
              message: "Это обязательное поле",
              required: true,
            },

            {
              message: "Неверный формат почты",
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Телефон"
          name="phone"
          rules={[
            {
              message: "Это обязательное поле",
              required: true,
            },
            {
              pattern: /(?<=^|\s|>|\;|\:|\))(?:\+|7|\()[\d\-\(\) ]{10,}\d/,
              message: "Телефон в формате +79998886655",
            },
          ]}
        >
          <Input defaultValue={"+7"} />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[
            {
              message: "Это обязательное поле",
              required: true,
            },
            {
              message: "От 20 латинских символов содержащих (a A % 4)",
              pattern:
                /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{20,40}$/,
            },
          ]}
        >
          <Input />
        </Form.Item>

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
            options={[
              {
                label: "Админ",
                value: "ADMIN",
              },
              {
                label: "Менеджер",
                value: "MANAGER",
              },
            ]}
          />
        </Form.Item>
      </Form>
    </Create>
  );
};
