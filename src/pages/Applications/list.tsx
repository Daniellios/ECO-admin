import {
  HttpError,
  IResourceComponentsProps,
  usePermissions,
  useResource,
} from "@pankod/refine-core";
import {
  useTable,
  DateField,
  TextField,
  useModalForm,
  Space,
  Form,
  Input,
  Select,
  DatePicker,
  DatePickerProps,
  Divider,
  Button,
  Row,
  Col,
} from "@pankod/refine-antd";
import React from "react";
import { List, Table } from "@pankod/refine-antd";
import { IApplication, IFilterApplication } from "../..";
import MyDeleteButton from "../../components/buttons/MyDeleteButton";
import MyEditButton from "../../components/buttons/MyEditButton";
import TableFilterForm from "../../components/forms/TableFilter";
import BooleanCell from "../../components/tables/BooleanCell";
import ModalActionForm from "../../components/modals/ModalActionForm";
import DatePickerField from "../../components/forms/fields/DatePickerField";
import DateCell from "../../components/tables/DateCell";
import RefetchListButton from "../../components/buttons/RefetchListButton";

// TODO  DO not populate data if error

//https://refine.dev/docs/api-reference/antd/hooks/form/useModalForm/
export const ApplicationsList: React.FC<IResourceComponentsProps> = () => {
  const { resource } = useResource({
    resourceNameOrRouteName: "applications",
  });

  const { tableProps, tableQueryResult, searchFormProps } = useTable<
    IApplication,
    HttpError,
    IFilterApplication
  >({
    syncWithLocation: false,
    initialPageSize: 15,
    resource: resource.name,
    queryOptions: { keepPreviousData: true },
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
        headerButtons={
          <>
            <RefetchListButton query={tableQueryResult}></RefetchListButton>
          </>
        }
      >
        <TableFilterForm
          formTitle="Фильтр по заявкам"
          formProps={searchFormProps}
        >
          <Form.Item name="phone">
            <Input placeholder="Телефон" />
          </Form.Item>
          <Form.Item name="createdAt">
            <DatePickerField placeholder="Дата заявки"></DatePickerField>
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
        </TableFilterForm>

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
              return <DateCell value={value}> </DateCell>;
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
              <BooleanCell
                value={value}
                valueLabelFalse="Не обработана"
                valueLabelTrue="Обработана"
              ></BooleanCell>
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

      <ModalActionForm
        modalProps={{ ...editModalProps, title: "Редактирование заявки" }}
        formProps={editFormProps}
      >
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
      </ModalActionForm>
    </>
  );
};
