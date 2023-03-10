import {
  IResourceComponentsProps,
  HttpError,
  useResource,
  usePermissions,
  useOne,
} from "@pankod/refine-core";

import {
  List,
  Table,
  TextField,
  Space,
  EditButton,
  ShowButton,
  Select,
  Tooltip,
  Input,
  Form,
  InputNumber,
} from "@pankod/refine-antd";

import { useTable } from "@pankod/refine-antd";

import { IFilterUserProps, IUser, IUserSkillForm, UserStatus } from "../..";
import MyRefreshButton from "../../components/buttons/MyRefreshButton";
import MyCreateButton from "../../components/buttons/MyCreateButton";
import TableFilterForm from "../../components/forms/TableFilter";
import { UserStatusTag } from "../../components/tags/UserStatus";
import RefetchListButton from "../../components/buttons/RefetchListButton";
import BooleanCell from "../../components/tables/BooleanCell";

export const UsersList: React.FC<IResourceComponentsProps> = () => {
  const { resource } = useResource({
    resourceNameOrRouteName: "users",
  });

  const refetchInterval = 1000 * 60;

  const { data: identity, isFetched } = usePermissions({});
  const isAdmin = identity?.roles === "ADMIN";

  const { tableProps, tableQueryResult, searchFormProps } = useTable<
    IUser,
    HttpError,
    IFilterUserProps
  >({
    syncWithLocation: false,
    queryOptions: { refetchInterval: refetchInterval },
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
      title="???????????? ????????????????"
      headerButtons={
        <>
          <RefetchListButton query={tableQueryResult}></RefetchListButton>
          <MyCreateButton resource={resource.name}></MyCreateButton>
        </>
      }
    >
      <TableFilterForm
        formTitle="???????????? ???? ????????????????"
        formProps={searchFormProps}
      >
        <Form.Item name="phone">
          <Input placeholder="??????????????" />
        </Form.Item>

        <Form.Item name="email">
          <Input placeholder="??????????" />
        </Form.Item>

        <Form.Item name="status">
          <Select
            dropdownMatchSelectWidth={false}
            placeholder="C?????????? ????????????????"
            options={[
              {
                label: "??????????????????????",
                value: "CONFIRMED",
              },
              {
                label: "?? ????????????????",
                value: "IN_CHECK",
              },
              {
                label: "??????????????",
                value: "BANNED",
              },
            ]}
          />
        </Form.Item>

        <Form.Item name="isEmailConfirmed">
          <Select
            dropdownMatchSelectWidth={false}
            placeholder="???????????? ??????????"
            options={[
              {
                label: "??????????????????????a",
                value: true,
              },
              {
                label: "???? ????????????????????????",
                value: false,
              },
            ]}
          />
        </Form.Item>

        <Form.Item name="workLoad">
          <InputNumber min={0} max={10} placeholder="????????????????" />
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
          title="??.??.??"
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
        <Table.Column dataIndex="phone" title="??????????????" />
        <Table.Column dataIndex="email" title="??????????" />

        {isAdmin && <Table.Column dataIndex="roles" title="????????" />}
        <Table.Column<IUser>
          dataIndex="workLoad"
          title="????????????????"
          sorter={{ compare: (a, b) => a.workLoad - b.workLoad }}
          showSorterTooltip={{ title: "?????????????????????????? ???? ????????????????" }}
        />
        <Table.Column dataIndex="workLoadLimit" title="????????. ????????????????" />
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
          title="?????????? ????????????????????????"
          align="center"
          sorter={{
            compare: (a, b) =>
              Number(a.isEmailConfirmed) - Number(b.isEmailConfirmed),
          }}
          showSorterTooltip={{ title: "?????????????????????????? ???? ??????????????????????????" }}
          render={(value: boolean) => (
            <BooleanCell
              value={value}
              valueLabelFalse="???? ????????????????????????"
              valueLabelTrue="????????????????????????"
            />
          )}
        />
        <Table.Column
          dataIndex="status"
          title="????????????"
          align="center"
          render={(value) => <UserStatusTag status={value} />}
        />
        {/* <Table.Column<IUserSkillForm>
          dataIndex="skillForm"
          title="????????????"
          render={(value: IUserSkillForm) => {
            if (value !== null) {
              return value.createdAt ? "????????????" : "??????";
            }
          }}
        /> */}

        <Table.Column<IUser>
          title="????????????????"
          align="center"
          render={(_, record) => (
            <Space>
              {/* <Tooltip title="??????????????????????????">
                <EditButton hideText size="small" recordItemId={record.id} />
              </Tooltip> */}
              <Tooltip title="??????????????????????">
                <ShowButton hideText size="small" recordItemId={record.id} />
              </Tooltip>
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
