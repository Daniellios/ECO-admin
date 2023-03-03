import { PlusCircleOutlined } from "@ant-design/icons";
import { Create, Form, Input, useForm } from "@pankod/refine-antd";
import {
  HttpError,
  IResourceComponentsProps,
  useResource,
} from "@pankod/refine-core";
import React from "react";
import { ICreateContract } from "../..";
import MySaveButton from "../../components/buttons/MySaveButton";
import CyrilicTextField from "../../components/forms/fields/CyrilicTextFIeld";
import DatePickerField from "../../components/forms/fields/DatePickerField";
import { removeEmptyValues } from "../../helpers/removeEmptyValues";

export const ContractCreate: React.FC<IResourceComponentsProps> = () => {
  const { resource } = useResource();

  const { formProps, form, onFinish } = useForm<ICreateContract, HttpError>({
    submitOnEnter: true,
    successNotification: {
      message: "Заказ успешно создан",
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
        const values: any = form.getFieldsValue();
        console.log(values);

        if (values.totalPrice) values.totalPrice = Number(values.totalPrice);
        const updated = removeEmptyValues(values);
        onFinish(updated);
      })
      .catch((errorfields) => {
        form.getFieldError(errorfields);
      });
  };

  return (
    <Create
      title="Новый заказ"
      footerButtons={
        <MySaveButton
          resource={resource.name}
          title="Создать"
          icon={<PlusCircleOutlined />}
          onClick={onHandleSubmit}
        ></MySaveButton>
      }
    >
      <Form {...formProps} layout="vertical" wrapperCol={{ span: 10 }}>
        <DatePickerField
          fromItemProps={{ name: "startAt" }}
          datePickerProps={{ placeholder: "Дата начала" }}
        ></DatePickerField>

        <DatePickerField
          fromItemProps={{ name: "endAt" }}
          datePickerProps={{ placeholder: "Дата конца" }}
        ></DatePickerField>

        <CyrilicTextField
          fromItemProps={{ name: "description" }}
          inputProps={{ placeholder: "Описание" }}
        ></CyrilicTextField>
        <Form.Item
          name="totalPrice"
          rules={[
            {
              pattern: /^\d*[1-9]\d*$/,
              message: "Целые числа больше 0",
            },
          ]}
        >
          <Input type={"number"} placeholder="Сумма"></Input>
        </Form.Item>
      </Form>
    </Create>
  );
};
