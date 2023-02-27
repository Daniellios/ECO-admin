import {
  DateField,
  EditButton,
  Form,
  Input,
  List,
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
import { ContractStatusTag } from "../../components/ContractStatus";
import TableFilterForm from "../../components/forms/TableFilter";
import BooleanCell from "../../components/tables/BooleanCell";
import { ICompany, IContract, IContractJob, IFilterContract } from "../..";

const ContractsList: React.FC<IResourceComponentsProps> = () => {
  const { resource } = useResource({
    resourceNameOrRouteName: "contracts",
  });

  const { data: identity, isFetched } = usePermissions({});

  const isAdmin = identity?.roles === "ADMIN";

  const { tableProps, tableQueryResult, searchFormProps } = useTable<
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
      ];
    },
  });

  return (
    <List
      title="Заказы"
      headerButtons={
        <>
          <RefetchListButton query={tableQueryResult}></RefetchListButton>
        </>
      }
    >
      <TableFilterForm
        formTitle="Фильтр по заказам"
        formProps={searchFormProps}
      >
        <Form.Item name="status">
          <Input placeholder="Статус" />
        </Form.Item>
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
          dataIndex="createdAt"
          title="Дата оформления"
          align="center"
          render={(value) => {
            return <DateField value={value}> </DateField>;
          }}
        />
        <Table.Column
          dataIndex="startAt"
          title="Начало работ"
          align="center"
          render={(value) => {
            return <DateField value={value}> </DateField>;
          }}
        />
        <Table.Column
          dataIndex="endAt"
          title="Окончание работ"
          align="center"
          render={(value) => {
            return <DateField value={value}> </DateField>;
          }}
        />
        <Table.Column<ICompany>
          dataIndex="company"
          title="Заказчик"
          align="center"
          render={(value: ICompany) => {
            return value ? value.companyName : "";
          }}
        />

        <Table.Column<ICompany>
          dataIndex="contractJobs"
          title="Кол-во услуг"
          align="center"
          render={(value: IContractJob[]) => {
            return value ? value.length : 0;
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
              valueLabelFalse="Не обработана"
              valueLabelTrue="Обработана"
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

export default ContractsList;
