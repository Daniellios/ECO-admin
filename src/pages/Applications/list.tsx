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
        title="???????????? ???? ????????????????????????"
        headerButtons={
          <>
            <RefetchListButton query={tableQueryResult}></RefetchListButton>
          </>
        }
      >
        <TableFilterForm
          formTitle="???????????? ???? ??????????????"
          formProps={searchFormProps}
        >
          <Form.Item name="phone">
            <Input placeholder="??????????????" />
          </Form.Item>

          <DatePickerField
            fromItemProps={{ name: "createdAt" }}
            datePickerProps={{ placeholder: "???????? ????????????" }}
          ></DatePickerField>

          <Form.Item name="isProcessed">
            <Select
              dropdownMatchSelectWidth={false}
              placeholder="C??????????"
              options={[
                {
                  label: "???? ????????????????????",
                  value: false,
                },
                {
                  label: "????????????????????",
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
          <Table.Column dataIndex="applicantName" title="??????" align="left" />
          <Table.Column
            dataIndex="details"
            title="????????????"
            align="center"
            ellipsis
            render={(value: string) => {
              return <TextField value={value ? value : "-"}></TextField>;
            }}
          />
          <Table.Column
            dataIndex="email"
            title="??????????"
            align="center"
            render={(value: string) => {
              return <TextField value={value ? value : "-"}></TextField>;
            }}
          />
          <Table.Column dataIndex="phone" title="??????????????" align="left" />
          <Table.Column<IApplication>
            dataIndex="createdAt"
            title="???????? ????????????"
            align="left"
            render={(value) => {
              return <DateCell value={value}> </DateCell>;
            }}
          />

          <Table.Column<IApplication>
            dataIndex="isProcessed"
            title="????????????"
            align="center"
            sorter={{
              compare: (a, b) => Number(a.isProcessed) - Number(b.isProcessed),
            }}
            showSorterTooltip={{ title: "?????????????????????????? ???? ?????????????? ??????????????????" }}
            render={(value: boolean) => (
              <BooleanCell
                value={value}
                valueLabelFalse="???? ????????????????????"
                valueLabelTrue="????????????????????"
              ></BooleanCell>
            )}
          />

          <Table.Column<IApplication>
            title="????????????????"
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
                    message: "???????????? ?????????????? ??????????????",
                    type: "success",
                  }}
                  errorNotification={{
                    message: "???????????? ?????? ???????????????? ????????????",
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
        modalProps={{ ...editModalProps, title: "???????????????????????????? ????????????" }}
        formProps={editFormProps}
      >
        <Form.Item
          label="????????????"
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
                label: "???? ????????????????????",
                value: false,
              },
              {
                label: "????????????????????",
                value: true,
              },
            ]}
          />
        </Form.Item>
      </ModalActionForm>
    </>
  );
};
