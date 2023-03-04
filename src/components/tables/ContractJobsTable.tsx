import { DeleteOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DeleteButton,
  Divider,
  EditButton,
  Form,
  Input,
  List,
  NumberField,
  Row,
  SaveButton,
  Space,
  Table,
  TextField,
  Typography,
  useEditableTable,
  useForm,
} from "@pankod/refine-antd";
import {
  HttpError,
  IResourceComponentsProps,
  useDelete,
  useResource,
} from "@pankod/refine-core";
import React from "react";
import { IContractJob, IUpdateContractJob } from "../..";
import { removeEmptyValues } from "../../helpers/removeEmptyValues";
import CyrilicTextField from "../forms/fields/CyrilicTextFIeld";
import PositiveNumberField from "../forms/fields/PositiveNumberField";

interface IContractJobsTableProps {
  contractId: string | undefined;
}

const ContractJobsTable: React.FC<IContractJobsTableProps> = ({
  contractId,
}) => {
  const { resource } = useResource({
    resourceNameOrRouteName: "contracts",
  });
  const { mutate: contractJobMutation } = useDelete();

  const {
    tableProps,
    queryResult,
    formProps,
    form,
    saveButtonProps,
    isEditing,

    onFinish,
    setId: setEditId,
    cancelButtonProps,
    editButtonProps,

    tableQueryResult,
  } = useEditableTable<IContractJob>({
    hasPagination: false,
    resource: `${resource.name}/${contractId}/jobs`,
  });

  const removeContractJob = (jobId: number) => {
    contractJobMutation({
      resource: `${resource.name}/${contractId}/jobs`,
      id: jobId,
      values: {
        id: jobId,
      },

      successNotification: {
        message: "Услуга успешно удалена",
        type: "success",
      },
    });
  };

  const {
    formProps: createJobFormProps,
    saveButtonProps: createJobSaveButtonProps,
    queryResult: createJobQueryResult,
    formLoading: createJobFormLoading,
    form: createJobForm,
    onFinish: createJobOnFinish,
  } = useForm<IContractJob, HttpError>({
    action: "create",
    onMutationSuccess: (data, variables, context) => {
      console.log({ data, variables, context });
    },
    redirect: false,
    successNotification: {
      message: "Услуга успешно создана",
      type: "success",
    },
    resource: `${resource.name}/${contractId}/jobs`,
  });

  const handleAddNewJob = async () => {
    await createJobForm
      .validateFields()
      .then(() => {
        const values: IUpdateContractJob = createJobForm.getFieldsValue();
        if (values.serviceVolume)
          values.serviceVolume = Number(values.serviceVolume);
        const updated = removeEmptyValues(values);

        createJobOnFinish(updated);
        createJobForm.resetFields();
      })
      .catch((errorfields) => {
        createJobForm.getFieldError(errorfields);
      });
  };

  const onHandleSubmit = () => {
    const values: IUpdateContractJob = form.getFieldsValue();
    if (values.serviceVolume)
      values.serviceVolume = Number(values.serviceVolume);

    const updated = removeEmptyValues(values);
    onFinish(updated);
  };

  return (
    <Card>
      <Row align={"middle"} justify="space-between">
        <Typography.Title level={3}>Список работ </Typography.Title>
      </Row>

      <Form {...formProps}>
        <Table
          {...tableProps}
          rowKey="id"
          loading={tableQueryResult.isLoading}
          pagination={false}
          showHeader={true}
        >
          <Table.Column<IContractJob>
            title="Вид работы"
            width={200}
            dataIndex={"serviceName"}
            render={(value, record) => {
              if (isEditing(record.id)) {
                return (
                  <CyrilicTextField
                    fromItemProps={{
                      name: "serviceName",
                      style: { margin: 0, minWidth: 100 },
                    }}
                    inputProps={{ type: "text", placeholder: "Вид работы" }}
                  />
                );
              }
              return <TextField value={value} />;
            }}
          ></Table.Column>
          <Table.Column<IContractJob>
            title="Объем  работ"
            width={200}
            dataIndex={"serviceVolume"}
            render={(value, record) => {
              if (isEditing(record.id)) {
                return (
                  <PositiveNumberField
                    fromItemProps={{ name: "serviceVolume" }}
                    inputProps={{ placeholder: "Объем работы" }}
                  ></PositiveNumberField>
                );
              }
              return <NumberField value={value} />;
            }}
          ></Table.Column>
          <Table.Column<IContractJob>
            title="Регион"
            dataIndex={"region"}
            render={(value, record) => {
              if (isEditing(record.id)) {
                return (
                  <CyrilicTextField
                    fromItemProps={{ name: "region", style: { margin: 0 } }}
                    inputProps={{ type: "text", placeholder: "Регион" }}
                  />
                );
              }
              return <TextField value={value} />;
            }}
          ></Table.Column>
          <Table.Column<IContractJob>
            title="Адрес"
            dataIndex={"address"}
            render={(value, record) => {
              if (isEditing(record.id)) {
                return (
                  <CyrilicTextField
                    fromItemProps={{ name: "address", style: { margin: 0 } }}
                    inputProps={{ type: "text", placeholder: "Адрес" }}
                  />
                );
              }
              return <TextField value={value} />;
            }}
          ></Table.Column>
          <Table.Column<IContractJob>
            title="Действия"
            align="center"
            dataIndex={"actions"}
            render={(_, record) => {
              if (isEditing(record.id)) {
                return (
                  <Space>
                    <SaveButton
                      onClick={onHandleSubmit}
                      hideText
                      size="small"
                    />
                    <Button {...cancelButtonProps} size="small">
                      Отмена
                    </Button>
                  </Space>
                );
              }
              return (
                <Space>
                  <EditButton
                    {...editButtonProps(record.id)}
                    hideText
                    size="small"
                  />
                  <Button
                    size="small"
                    danger
                    onClick={() => removeContractJob(record.id)}
                    icon={<DeleteOutlined />}
                  ></Button>
                </Space>
              );
            }}
          ></Table.Column>
        </Table>
      </Form>

      <Divider></Divider>

      <Form {...createJobFormProps} size="middle">
        <Row justify={"start"} gutter={30}>
          <Col span={5} style={{ maxWidth: 200 }}>
            <CyrilicTextField
              fromItemProps={{ name: "serviceName" }}
              inputProps={{ type: "text", placeholder: "Вид работы" }}
            />
          </Col>
          <Col span={5} style={{ maxWidth: 200 }}>
            <PositiveNumberField
              fromItemProps={{ name: "serviceVolume" }}
              inputProps={{ placeholder: "Объем работы" }}
            />
          </Col>
          <Col span={5}>
            <CyrilicTextField
              fromItemProps={{ name: "region" }}
              inputProps={{ type: "text", placeholder: "Регион" }}
            />
          </Col>
          <Col span={5}>
            <CyrilicTextField
              fromItemProps={{ name: "address" }}
              inputProps={{ type: "text", placeholder: "Адрес" }}
            />
          </Col>

          <Col>
            <Button onClick={handleAddNewJob}> Добавить работу</Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default ContractJobsTable;
