import {
  Form,
  Input,
  List,
  Modal,
  Select,
  ShowButton,
  Space,
  Table,
  TextField,
  Tooltip,
} from "@pankod/refine-antd";
import {
  HttpError,
  IResourceComponentsProps,
  usePermissions,
  useResource,
} from "@pankod/refine-core";
import { IStaffMember } from "../../interfaces";

import { useTable } from "@pankod/refine-antd";
import TableFilterForm from "../../components/forms/TableFilter";
import MyCreateButton from "../../components/buttons/MyCreateButton";
import MyEditButton from "../../components/buttons/MyEditButton";

//TODO - make more
export const StaffList: React.FC<IResourceComponentsProps> = () => {
  const { data } = usePermissions({});
  console.log(data);

  const { resource } = useResource({
    resourceNameOrRouteName: "cmp",
  });

  const { tableProps, tableQueryResult, searchFormProps } = useTable<
    IStaffMember,
    HttpError
  >({
    syncWithLocation: false,
    initialPageSize: 10,
    resource: resource.name,
  });

  return (
    <List
      title="Сотрудники"
      headerButtons={<MyCreateButton resource={resource.name}></MyCreateButton>}
    >
      <TableFilterForm
        formTitle="Фильтр по сотрудникам"
        formProps={searchFormProps}
      >
        <Form.Item name="phone">
          <Input placeholder="Телефон" />
        </Form.Item>

        <Form.Item name="email">
          <Input placeholder="Почта" />
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
        {data.roles === "ADMIN" && (
          <Table.Column dataIndex="id" title="ID" align="left" />
        )}

        <Table.Column<IStaffMember>
          dataIndex={["firstName", "secondName"]}
          title="Ф.И.О"
          ellipsis
          align="center"
          width={"160px"}
          render={(value, record) => {
            return (
              <TextField
                ellipsis
                value={`${record.firstName} ${record.secondName} `}
              ></TextField>
            );
          }}
        />
        <Table.Column dataIndex="phone" align="center" title="Телефон" />
        <Table.Column dataIndex="email" align="center" title="Почта" />
        <Table.Column dataIndex="roles" align="center" title="Роль" />

        <Table.Column<IStaffMember>
          title="Действия"
          align="center"
          render={(_, record) => (
            <Space>
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
