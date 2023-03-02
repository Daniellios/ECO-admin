import { DeleteOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DeleteButton,
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

    resource: `${resource.name}/${contractId}/jobs`,
  });

  const handleAddNewJob = () => {
    const values = createJobForm.getFieldsValue();
    console.log(values);

    //   await createJobForm
    //     .validateFields()
    //     .then(() => {
    //       const values = createJobForm.getFieldsValue();
    //       console.log(values);

    //       createJobOnFinish(values);
    //     })
    //     .catch((errorfields) => {
    //       createJobForm.getFieldError(errorfields);
    //     });
  };

  const onHandleSubmit = () => {
    const values: IUpdateContractJob = form.getFieldsValue();
    if (values.serviceName) values.serviceVolume = Number(values.serviceVolume);

    const updated = removeEmptyValues(values);
    onFinish(updated);
  };

  return (
    <Card>
      <Row align={"middle"} justify="space-between">
        <Typography.Title level={3}>Список работ </Typography.Title>

        <Button onClick={handleAddNewJob}> Добавить</Button>
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
            dataIndex={"serviceName"}
            render={(value, record) => {
              if (isEditing(record.id)) {
                return (
                  <Form.Item name="serviceName" style={{ margin: 0 }}>
                    <Input />
                  </Form.Item>
                );
              }
              return <TextField value={value} />;
            }}
          ></Table.Column>
          <Table.Column<IContractJob>
            title="Объем  работ"
            dataIndex={"serviceVolume"}
            render={(value, record) => {
              if (isEditing(record.id)) {
                return (
                  <Form.Item name="serviceVolume" style={{ margin: 0 }}>
                    <Input type={"number"} />
                  </Form.Item>
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
                  <Form.Item name="region" style={{ margin: 0 }}>
                    <Input />
                  </Form.Item>
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
                  <Form.Item name="address" style={{ margin: 0 }}>
                    <Input />
                  </Form.Item>
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

      <Form {...createJobFormProps}>
        <Row justify={"start"}>
          <Col span={5}>
            <Form.Item name="serviceName">
              <Input name="serviceName" placeholder="Вид работы"></Input>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item>
              <Input
                name="serviceVolume"
                type={"number"}
                placeholder="Объем работы"
              ></Input>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item>
              <Input name="region" placeholder="Регион "></Input>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item>
              <Input name="address" placeholder="Адрес"></Input>
            </Form.Item>
          </Col>
        </Row>
        <Button onClick={handleAddNewJob}> Добавить</Button>
      </Form>
    </Card>
  );
};

export default ContractJobsTable;
