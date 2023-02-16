import {
  IResourceComponentsProps,
  useMany,
  getDefaultFilter,
  CrudFilters,
  HttpError,
  useResource,
} from "@pankod/refine-core";

import {
  List,
  Table,
  TextField,
  Space,
  EditButton,
  ShowButton,
  FilterDropdown,
  Select,
  Radio,
  TagField,
  BooleanField,
  Tooltip,
  Input,
  Form,
  Col,
  Row,
  Button,
  Card,
  Breadcrumb,
  Divider,
  InputNumber,
} from "@pankod/refine-antd";

import { useTable, useSelect } from "@pankod/refine-antd";

import { IFilterUserProps, IUser, UserStatus } from "../../interfaces";
import MyRefreshButton from "../../components/buttons/MyRefreshButton";
import {
  CheckOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useMemo } from "react";
import MyCreateButton from "../../components/buttons/MyCreateButton";
import MySaveButton from "../../components/buttons/MySaveButton";
import TableFilterForm from "../../components/forms/TableFilter";
import { UserStatusTag } from "../../components/UserStatus";

export const UsersList: React.FC<IResourceComponentsProps> = () => {
  const { resource } = useResource({
    resourceNameOrRouteName: "users",
  });

  const { tableProps, filters, tableQueryResult, searchFormProps, setFilters } =
    useTable<IUser, HttpError, IFilterUserProps>({
      syncWithLocation: false,
      initialPageSize: 10,
      resource: resource.name,
      onSearch: (values: IFilterUserProps) => {
        return [
          {
            field: "status",
            operator: "eq",
            value: values.status,
          },
          {
            field: "phone",
            operator: "eq",
            value: values.phone,
          },
          {
            field: "email",
            operator: "eq",
            value: values.email,
          },
          {
            field: "isEmailConfirmed",
            operator: "eq",
            value: values.isEmailConfirmed,
          },
          {
            field: "workLoad",
            operator: "eq",
            value: values.workLoad,
          },
        ];
      },
    });

  // const currentFilterValues = useMemo(() => {
  //   // Filters can be a LogicalFilter or a ConditionalFilter. ConditionalFilter not have field property. So we need to filter them.
  //   // We use flatMap for better type support.
  //   const logicalFilters = filters.flatMap((item) =>
  //     "field" in item ? item : []
  //   );

  //   return {
  //     firstName:
  //       logicalFilters.find((item) => item.field === "firstName")?.value || "",
  //     phone: logicalFilters.find((item) => item.field === "phone")?.value || "",
  //     id: logicalFilters.find((item) => item.field === "id")?.value || "",
  //     status:
  //       logicalFilters.find((item) => item.field === "status")?.value || "",
  //   };
  // }, [filters]);

  //   const { selectProps: categorySelectProps } = useSelect<ICategory>({
  //     optionLabel: "title",
  //     optionValue: "id",
  //     defaultValue: getDefaultFilter("category.id", filters, "in"),
  //   });

  return (
    <List
      title="Список экологов"
      headerButtons={<MyCreateButton resource={resource.name}></MyCreateButton>}
    >
      <TableFilterForm
        formTitle="Фильтр по экологам"
        formProps={searchFormProps}
      >
        <Form.Item name="phone">
          <Input placeholder="Телефон" />
        </Form.Item>

        <Form.Item name="email">
          <Input placeholder="Почта" />
        </Form.Item>

        <Form.Item name="status">
          <Select
            dropdownMatchSelectWidth={false}
            placeholder="Cтатус аккаунта"
            options={[
              {
                label: "Подтвержден",
                value: "CONFIRMED",
              },
              {
                label: "В проверке",
                value: "IN_CHECK",
              },
              {
                label: "Забанен",
                value: "BANNED",
              },
            ]}
          />
        </Form.Item>

        <Form.Item name="isEmailConfirmed">
          <Select
            dropdownMatchSelectWidth={false}
            placeholder="Статус почты"
            options={[
              {
                label: "Подтвержденa",
                value: true,
              },
              {
                label: "Не подтверждена",
                value: false,
              },
            ]}
          />
        </Form.Item>

        <Form.Item name="workLoad">
          <InputNumber min={0} max={10} placeholder="Нагрузка" />
        </Form.Item>
      </TableFilterForm>

      <Table
        {...tableProps}
        rowKey="id"
        bordered={true}
        loading={tableQueryResult.isLoading}
        pagination={{
          ...tableProps.pagination,
          pageSizeOptions: [10, 15, 25],
          showSizeChanger: true,
        }}
      >
        <Table.Column dataIndex="id" title="ID" align="left" />
        <Table.Column<IUser>
          dataIndex={["firstName", "secondName", "thirdName"]}
          title="Ф.И.О"
          ellipsis
          align="center"
          width={"160px"}
          render={(value, record) => {
            return (
              <TextField
                ellipsis
                value={`${record.firstName} ${record.secondName} ${record.thirdName}`}
              ></TextField>
            );
          }}
        />
        <Table.Column
          dataIndex="phone"
          title="Телефон"
          // filterDropdown={(props) => {
          //   return (
          //     <FilterDropdown {...props}>
          //       <Input
          //         placeholder="Телефон"
          //         // prefix={<SearchOutlined />}
          //         // value={currentFilterValues.phone}
          //         // onChange={(e) => {
          //         //   setFilters([
          //         //     {
          //         //       field: "phone",
          //         //       operator: "contains",
          //         //       value: !!e.currentTarget.value
          //         //         ? e.currentTarget.value
          //         //         : undefined,
          //         //     },
          //         //   ]);
          //         // }}
          //       />
          //     </FilterDropdown>
          //   );
          // }}
        />
        <Table.Column dataIndex="email" title="Почта" />
        <Table.Column dataIndex="roles" title="Роль" />
        <Table.Column<IUser>
          dataIndex="workLoad"
          title="Нагрузка"
          sorter={{ compare: (a, b) => a.workLoad - b.workLoad }}
          showSorterTooltip={{ title: "Отсортировать по нагрузке" }}
        />
        <Table.Column dataIndex="workLoadLimit" title="Макс. нагрузка" />
        {/* <Table.Column
          dataIndex={["category", "id"]}
          title="Category"
        //   render={(value) => {
        //     if (isLoading) {
        //       return <TextField value="Loading..." />;
        //     }

        //     return (
        //       <TextField
        //         value={data?.data.find((item) => item.id === value)?.title}
        //       />
        //     );
        //   }}
          filterDropdown={(props) => (
            <FilterDropdown
              {...props}
              mapValue={(selectedKeys) => selectedKeys.map(Number)}
            >
              <Select
                style={{ minWidth: 200 }}
                mode="multiple"
                placeholder="Select Category"
                // {...categorySelectProps}
              />
            </FilterDropdown>
          )}
          defaultFilteredValue={getDefaultFilter("category.id", filters, "in")}
        /> */}
        <Table.Column<IUser>
          dataIndex="isEmailConfirmed"
          title="Почта подтверждена"
          align="center"
          sorter={{
            compare: (a, b) =>
              Number(a.isEmailConfirmed) - Number(b.isEmailConfirmed),
          }}
          showSorterTooltip={{ title: "Отсортировать по подтверждению" }}
          render={(value: boolean) => (
            <BooleanField
              value={value}
              valueLabelFalse="Не подтверждена"
              valueLabelTrue="Подтверждена"
              trueIcon={<CheckOutlined style={{ color: "#52c41a" }} />}
              falseIcon={<CloseOutlined style={{ color: "#ff4d4f" }} />}
            />
          )}
        />
        <Table.Column
          dataIndex="status"
          title="Статус"
          align="center"
          render={(value) => {
            return <UserStatusTag status={value} />;
          }}
          // filterDropdown={(props) => (
          //   <FilterDropdown {...props}   >
          //     <Radio.Group >
          //       <Radio value="CONFIRMED">Подтвержден</Radio>
          //       <Radio value="IN_CHECK">В проверке</Radio>
          //       <Radio value="BANNED">Забанен</Radio>
          //     </Radio.Group>
          //   </FilterDropdown>
          // )}
        />
        <Table.Column<IUser>
          dataIndex="skillForm"
          title="Анкета"
          render={(value: null) => (Boolean(value) ? "Анкета " : "Нет")}
        />

        <Table.Column<IUser>
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
