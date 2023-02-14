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
  SaveButton,
  DatePicker,
  DatePickerProps,
  Title,
  Divider,
} from "@pankod/refine-antd";
import React from "react";
import { BooleanField, EmailField, List, Table } from "@pankod/refine-antd";
import { IApplication, IFilterApplication } from "../../interfaces";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import MySaveButton from "../../components/buttons/MySaveButton";
import MyDeleteButton from "../../components/buttons/MyDeleteButton";
import MyEditButton from "../../components/buttons/MyEditButton";
import MyRefreshButton from "../../components/buttons/MyRefreshButton";

// TODO  MAKE NEW DATA PROVIDER FOR

//https://refine.dev/docs/api-reference/antd/hooks/form/useModalForm/
export const ApplicationsList: React.FC<IResourceComponentsProps> = () => {
  const { resource } = useResource({
    resourceNameOrRouteName: "applications",
  });

  const {
    tableProps,
    filters,
    tableQueryResult,
    searchFormProps,
    setPageSize,
  } = useTable<IApplication, HttpError, IFilterApplication>({
    syncWithLocation: false,
    initialPageSize: 15,
    resource: resource.name,
    dataProviderName: resource.name,
    onSearch: (values: IFilterApplication) => {
      return [
        {
          field: "phone",
          operator: "contains",
          value: values.phone,
        },
        {
          field: "createdAt",
          operator: "eq",
          value: values.createdAt,
        },
        {
          field: "isProcessed",
          operator: "eq",
          value: values.isProcessed,
        },
      ];
    },
  });

  const onDatePick: DatePickerProps["onChange"] = (date, dateString) => {
    return date?.get("d");
  };

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
      <List
        title="Заявки на консультацию"
        headerButtons={() => (
          <>
            <MyRefreshButton resource={resource.name}></MyRefreshButton>
          </>
        )}
      >
        <Form
          {...searchFormProps}
          layout="inline"
          autoComplete="on"
          size="middle"
        >
          <Form.Item name="phone">
            <Input placeholder="Телефон" />
          </Form.Item>
          <Form.Item name="createdAt">
            <DatePicker
              onChange={onDatePick}
              placeholder="Дата заявки"
            ></DatePicker>
          </Form.Item>
          <Form.Item name="isProcessed">
            <Select
              dropdownMatchSelectWidth={false}
              placeholder="Cтатус"
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
          <MySaveButton
            onClick={searchFormProps.form?.submit}
            icon={null}
            title="Применить"
          />
        </Form>

        <Divider></Divider>

        <Table
          {...tableProps}
          rowKey="id"
          bordered={true}
          pagination={{
            ...tableProps.pagination,
            pageSizeOptions: [10, 15, 25],
            showSizeChanger: true,
          }}
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
