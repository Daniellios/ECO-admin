import {
  MinusCircleOutlined,
  PlusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Create,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
  Typography,
  useForm,
} from "@pankod/refine-antd";
import {
  HttpError,
  IResourceComponentsProps,
  useResource,
} from "@pankod/refine-core";
import React from "react";
import { ICreateContract, ICreateContractJob } from "../..";
import MySaveButton from "../../components/buttons/MySaveButton";
import CyrilicTextField from "../../components/forms/fields/CyrilicTextFIeld";
import DatePickerField from "../../components/forms/fields/DatePickerField";
import PositiveNumberField from "../../components/forms/fields/PositiveNumberField";
import PageTitle from "../../components/shared/PageTitle";
import { removeEmptyValues } from "../../helpers/removeEmptyValues";

export const ContractCreate: React.FC<IResourceComponentsProps> = () => {
  const { resource } = useResource();

  const { formProps, form, onFinish } = useForm<ICreateContract, HttpError>({
    submitOnEnter: true,
    redirect: "show",
    successNotification: {
      message: "Заказ успешно создан",
      type: "success",
    },
    action: "create",
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

  const contractJobs: ICreateContractJob[] = [
    { address: "", region: "", serviceVolume: 1, serviceName: "" },
  ];

  return (
    <Create
      title={<PageTitle title="Новый заказ" id={""} />}
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
        <DatePickerField
          fromItemProps={{ name: "startAt" }}
          datePickerProps={{ placeholder: "Дата начала" }}
        ></DatePickerField>

        <DatePickerField
          fromItemProps={{ name: "endAt" }}
          datePickerProps={{ placeholder: "Дата конца" }}
        ></DatePickerField>

        <CyrilicTextField
          isTextArea
          fromItemProps={{ name: "description" }}
          inputProps={{ placeholder: "Описание" }}
        ></CyrilicTextField>

        <PositiveNumberField
          fromItemProps={{ name: "totalPrice", initialValue: 0 }}
          inputProps={{ placeholder: "Сумма" }}
        ></PositiveNumberField>

        <Divider></Divider>

        <Typography.Title level={4}>Услуги по заказу</Typography.Title>

        <Form.List name={"contractJobs"} initialValue={contractJobs}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <>
                  <Space
                    key={key}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 0,

                      justifyContent: "flex-start",
                    }}
                  >
                    <CyrilicTextField
                      fromItemProps={{
                        ...restField,
                        name: [name, "serviceName"],
                      }}
                      inputProps={{ placeholder: "Вид работы" }}
                    ></CyrilicTextField>

                    <PositiveNumberField
                      fromItemProps={{
                        ...restField,
                        name: [name, "serviceVolume"],
                        style: { marginBottom: 24 },
                      }}
                      inputProps={{ placeholder: "Объем работы" }}
                    />

                    <CyrilicTextField
                      fromItemProps={{ ...restField, name: [name, "region"] }}
                      inputProps={{ placeholder: "Регион" }}
                    ></CyrilicTextField>

                    <CyrilicTextField
                      fromItemProps={{ ...restField, name: [name, "address"] }}
                      inputProps={{ placeholder: "Адрес" }}
                    ></CyrilicTextField>

                    <Button
                      icon={<MinusCircleOutlined />}
                      style={{ marginBottom: 24, border: "none" }}
                      onClick={() => remove(name)}
                    ></Button>
                  </Space>
                </>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Добавить услугу
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Create>
  );
};
