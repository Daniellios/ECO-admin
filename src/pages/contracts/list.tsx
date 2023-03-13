import {
  DateField,
  EditButton,
  Form,
  Input,
  List,
  Select,
  ShowButton,
  Space,
  Table,
  Tooltip,
  useTable,
} from "@pankod/refine-antd";
import {
  HttpError,
  IResourceComponentsProps,
  usePermissions,
  useResource,
} from "@pankod/refine-core";
import React from "react";
import RefetchListButton from "../../components/buttons/RefetchListButton";

import TableFilterForm from "../../components/forms/TableFilter";
import BooleanCell from "../../components/tables/BooleanCell";
import { ICompany, IContract, IContractJob, IFilterContract } from "../..";
import DatePickerField from "../../components/forms/fields/DatePickerField";
import DateCell from "../../components/tables/DateCell";
import MyCreateButton from "../../components/buttons/MyCreateButton";
import { ContractStatusTag } from "../../components/tags/ContractStatus";

//TODO - add amount of contract filtering ?
export const ContractsList: React.FC<IResourceComponentsProps> = () => {
  const { resource } = useResource({
    resourceNameOrRouteName: "contracts",
  });

  const { data: identity, isFetched } = usePermissions({});

  const isAdmin = identity?.roles === "ADMIN";

  const { tableProps, tableQueryResult, searchFormProps, sorter } = useTable<
    IContract,
    HttpError,
    IFilterContract
  >({
    syncWithLocation: false,
    initialPageSize: 15,

    resource: resource.name,
    queryOptions: { keepPreviousData: true },
    dataProviderName: resource.name,
    onSearch: (values: IFilterContract) => {
      return [
        {
          field: "status",
          operator: "contains",
          value: values.status,
        },
        {
          field: "startAt",
          operator: "eq",
          value: values.startAt,
        },
        {
          field: "endAt",
          operator: "eq",
          value: values.endAt,
        },
        {
          field: "hasCandidates",
          operator: "eq",
          value: values.hasCandidates,
        },
        {
          field: "companyName",
          operator: "eq",
          value: values.companyName,
        },
      ];
    },
  });

  return (
    <List
      title="Заказы"
      headerButtons={
        <>
          <RefetchListButton query={tableQueryResult}></RefetchListButton>
          <MyCreateButton resource={resource.name}></MyCreateButton>
        </>
      }
    >
      <TableFilterForm
        formTitle="Фильтр по заказам"
        formProps={searchFormProps}
      >
        <Form.Item name="status">
          <Select
            dropdownMatchSelectWidth={false}
            placeholder="Статус"
            options={[
              {
                label: "В работе",
                value: "IN_WORK",
              },
              {
                label: "Подготовка",
                value: "PREPARATION",
              },
              {
                label: "Завершен",
                value: "COMPLETED",
              },
            ]}
          />
        </Form.Item>

        <DatePickerField
          fromItemProps={{ name: "startAt" }}
          datePickerProps={{ placeholder: "Начало" }}
        ></DatePickerField>

        <DatePickerField
          fromItemProps={{ name: "endAt" }}
          datePickerProps={{ placeholder: "Конец" }}
        ></DatePickerField>

        {/* <Form.Item name="companyName">
          <Input placeholder="Заказчик"></Input>
        </Form.Item> */}
      </TableFilterForm>

      <Table<IContract>
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
        <Table.Column
          dataIndex="id"
          title="Id"
          align="left"
          ellipsis
          width={200}
          render={(value) => value}
        />
        <Table.Column
          dataIndex="startAt"
          title="Начало работ"
          align="center"
          render={(value) => {
            return <DateCell value={value}> </DateCell>;
          }}
          sorter
        />
        <Table.Column
          dataIndex="endAt"
          title="Окончание работ"
          align="center"
          render={(value) => {
            return <DateCell value={value}> </DateCell>;
          }}
          sorter
        />
        <Table.Column<ICompany>
          dataIndex="company"
          title="Заказчик"
          align="center"
          render={(value: ICompany) => {
            return value ? value.companyName : "-";
          }}
        />

        <Table.Column<IContract>
          dataIndex="contractJobs"
          title="Кол-во услуг"
          align="center"
          render={(value: IContractJob[]) => {
            return value ? value.length : 0;
          }}
          sorter={{
            compare: (a, b) => a.contractJobs.length - b.contractJobs.length,
          }}
        />

        <Table.Column<IContract>
          dataIndex="hasCandidates"
          title="Наличие кандидатов"
          align="center"
          showSorterTooltip={{ title: "Отсортировать по наличию кандидатов" }}
          sorter={{
            compare: (a, b) =>
              Number(a.hasCandidates) - Number(b.hasCandidates),
          }}
          render={(value: boolean) => (
            <BooleanCell
              value={value}
              valueLabelFalse="Нет"
              valueLabelTrue="Есть"
            ></BooleanCell>
          )}
        />

        <Table.Column
          dataIndex="status"
          title="Статус"
          align="center"
          render={(value) => <ContractStatusTag status={value} />}
        />

        <Table.Column<IContract>
          title="Действия"
          align="center"
          render={(_, record) => (
            <Space>
              <Tooltip title="Редактировать">
                <EditButton hideText size="small" recordItemId={record.id} />
              </Tooltip>
              <Tooltip title="Просмотреть">
                <ShowButton hideText size="small" recordItemId={record.id} />
              </Tooltip>
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
