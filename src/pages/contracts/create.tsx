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
import React, { useState } from "react";
import { ICreateContract, ICreateContractJob } from "../..";
import MySaveButton from "../../components/buttons/MySaveButton";
import CyrilicTextField from "../../components/forms/fields/CyrilicTextFIeld";
import DatePickerField from "../../components/forms/fields/DatePickerField";
import PositiveNumberField from "../../components/forms/fields/PositiveNumberField";
import PageTitle from "../../components/shared/PageTitle";
import { removeEmptyValues } from "../../helpers/removeEmptyValues";

export const ContractCreate: React.FC<IResourceComponentsProps> = () => {
  const { resource } = useResource();

  const [totalSum, setTotalSum] = useState<number>(0);

  const { formProps, form, onFinish } = useForm<
    ICreateContract,
    HttpError,
    ICreateContract
  >({
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

  // const calculateTotalSum = () => {
  //   const currentValues: ICreateContract = form.getFieldsValue();

  //   const sum = currentValues.contractJobs.reduce((acc, contract) => {
  //     if (contract.servicePrice) {
  //       return acc + contract.servicePrice;
  //     } else {
  //       return acc;
  //     }
  //   }, 0);

  //   setTotalSum(sum);

  // };

  const onHandleSubmit = async () => {
    await form
      .validateFields()
      .then(() => {
        const values = form.getFieldsValue();

        const updated = removeEmptyValues(values);
        onFinish(updated);
      })
      .catch((errorfields) => {
        form.getFieldError(errorfields);
      });
  };

  const contractJobs: ICreateContractJob[] = [
    {
      address: "",
      region: "",
      serviceVolume: null,
      servicePrice: null,
      serviceName: "",
    },
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
        <Row>
          <Col>
            <DatePickerField
              fromItemProps={{ name: "startAt" }}
              datePickerProps={{ placeholder: "Дата начала" }}
            ></DatePickerField>
          </Col>

          <Col push={1}>
            <DatePickerField
              fromItemProps={{ name: "endAt" }}
              datePickerProps={{ placeholder: "Дата конца" }}
            ></DatePickerField>
          </Col>
        </Row>

        <CyrilicTextField
          isTextArea
          fromItemProps={{ name: "description" }}
          inputProps={{ placeholder: "Описание" }}
        ></CyrilicTextField>

        <Divider></Divider>

        <Typography.Title level={4}>Услуги по заказу</Typography.Title>

        {/* <Row>
                    <Col>
                      <Typography.Text> Вид услуги</Typography.Text>
                    </Col>
                    <Col>
                      <Typography.Text> Объем услуги</Typography.Text>
                    </Col>
                    <Col>
                      <Typography.Text> Стоимость услуги</Typography.Text>
                    </Col>

                    <Col>
                      <Typography.Text> Регион</Typography.Text>
                    </Col>
                    <Col>
                      <Typography.Text> Адрес</Typography.Text>
                    </Col>
                  </Row> */}

        <Form.List name={"contractJobs"} initialValue={contractJobs}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} size={16} wrap>
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
                    inputProps={{
                      placeholder: "Объем работы",
                      // onChange: calculateTotalSum,
                    }}
                  />

                  <PositiveNumberField
                    fromItemProps={{
                      ...restField,
                      name: [name, "servicePrice"],
                      style: { marginBottom: 24 },
                    }}
                    inputProps={{
                      placeholder: "Стоимость услуги",
                      // onChange: calculateTotalSum,
                    }}
                  ></PositiveNumberField>

                  <CyrilicTextField
                    fromItemProps={{ ...restField, name: [name, "region"] }}
                    inputProps={{ placeholder: "Регион" }}
                  ></CyrilicTextField>

                  <CyrilicTextField
                    fromItemProps={{
                      ...restField,
                      name: [name, "address"],
                    }}
                    inputProps={{ placeholder: "Адрес" }}
                  ></CyrilicTextField>

                  <Button
                    icon={<MinusCircleOutlined />}
                    style={{ marginBottom: 24, border: "none" }}
                    onClick={() => remove(name)}
                  ></Button>
                </Space>
              ))}
              <Form.Item>
                <Button
                  style={{ maxWidth: 180 }}
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

        <PositiveNumberField
          fromItemProps={{
            label: "Сумма всего",
            name: "totalPrice",
            initialValue: null,
          }}
          inputProps={{
            placeholder: "Сумма",
          }}
        ></PositiveNumberField>
      </Form>
    </Create>
  );
};
