import {
  HttpError,
  IResourceComponentsProps,
  useList,
  useNotification,
  useResource,
} from "@pankod/refine-core";
import {
  useTable,
  useSelect,
  DateField,
  TextField,
  useModalForm,
  Space,
  Tooltip,
  EditButton,
  Modal,
  Form,
  Input,
  Select,
  Button,
  DeleteButton,
  Breadcrumb,
} from "@pankod/refine-antd";
import React from "react";
import { BooleanField, EmailField, List, Table } from "@pankod/refine-antd";
import { IApplication } from "../../interfaces";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import MySaveButton from "../../components/buttons/MySaveButton";
import MyDeleteButton from "../../components/buttons/MyDeleteButton";
import MyEditButton from "../../components/buttons/MyEditButton";

// TODO  MAKE NEW DATA PROVIDER FOR

//https://refine.dev/docs/api-reference/antd/hooks/form/useModalForm/
export const ApplicationsList: React.FC<IResourceComponentsProps> = () => {
  const { resource } = useResource({
    resourceNameOrRouteName: "applications",
  });

  const { tableProps, filters, tableQueryResult } = useTable<
    IApplication,
    HttpError
  >({
    syncWithLocation: false,
    initialPageSize: 15,
    resource: resource.name,
    dataProviderName: resource.name,
    defaultSetFilterBehavior: "replace",
  });

  const {
    modalProps: editModalProps,
    formProps: editFormProps,
    show: editModalShow,
  } = useModalForm<IApplication>({
    autoSubmitClose: true,
    action: "edit",
    warnWhenUnsavedChanges: true,
  });

  return (
    <>
      <List title="Заявки на консультацию">
        <Table
          {...tableProps}
          rowKey="id"
          bordered={true}
          loading={tableQueryResult.isLoading}
        >
          <Table.Column dataIndex="applicantName" title="Имя" align="left" />
          <Table.Column
            dataIndex="details"
            title="Детали"
            align="center"
            ellipsis
            render={(value: string) => {
              return <TextField value={value ? value : "-"}></TextField>;
            }}
          />
          <Table.Column
            dataIndex="email"
            title="Почта"
            align="center"
            render={(value: string) => {
              return <TextField value={value ? value : "-"}></TextField>;
            }}
          />
          <Table.Column dataIndex="phone" title="Телефон" align="left" />
          <Table.Column<IApplication>
            dataIndex="createdAt"
            title="Дата заявки"
            align="left"
            render={(value) => {
              return <DateField value={value}> </DateField>;
            }}
          />

          <Table.Column<IApplication>
            dataIndex="isProcessed"
            title="Статус"
            align="center"
            sorter={{
              compare: (a, b) => Number(a.isProcessed) - Number(b.isProcessed),
            }}
            showSorterTooltip={{ title: "Отсортировать по статусу обработки" }}
            render={(value: boolean) => (
              <BooleanField
                value={value}
                valueLabelFalse="Не обработана"
                valueLabelTrue="Обработана"
                trueIcon={<CheckOutlined style={{ color: "#52c41a" }} />}
                falseIcon={<CloseOutlined style={{ color: "#ff4d4f" }} />}
              />
            )}
          />

          <Table.Column<IApplication>
            title="Действия"
            align="center"
            render={(_, record) => (
              <Space>
                <MyEditButton
                  hideText
                  size="small"
                  recordItemId={record.id}
                  onClick={() => editModalShow(record.id)}
                />
                <MyDeleteButton
                  hideText
                  successNotification={{
                    message: "Заявка успешно удалена",
                    type: "success",
                  }}
                  errorNotification={{
                    message: "Ошибка при удалении заявки",
                    type: "error",
                  }}
                  resource={resource.name}
                  size="small"
                  recordItemId={record.id}
                />
              </Space>
            )}
          />
        </Table>
      </List>

      <Modal
        {...editModalProps}
        title="Заявка"
        width={"600px"}
        cancelText="Отмена"
        okText="Сохранить"
      >
        <Form {...editFormProps} layout="vertical">
          <Form.Item
            label="Статус"
            name="isProcessed"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Select
              options={[
                {
                  label: "Не обработана",
                  value: false,
                },
                {
                  label: "Обработана",
                  value: true,
                },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
