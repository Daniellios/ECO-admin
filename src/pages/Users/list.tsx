import {
  IResourceComponentsProps,
  useMany,
  getDefaultFilter,
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
} from "@pankod/refine-antd";

import { useTable, useSelect } from "@pankod/refine-antd";

import { IUser, UserStatus } from "../../interfaces";
import MyRefreshButton from "../../components/MyRefreshButton";

export const UsersList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps, filters } = useTable<IUser>({
    syncWithLocation: true,
  });

  //   const { selectProps: categorySelectProps } = useSelect<ICategory>({
  //     optionLabel: "title",
  //     optionValue: "id",
  //     defaultValue: getDefaultFilter("category.id", filters, "in"),
  //   });

  return (
    <List title="Список экологов">
      <Table {...tableProps} rowKey="id" bordered={true}>
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
          filterDropdown={() => {
            return <Input></Input>;
          }}
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
            <BooleanField color={value ? "lime" : "red"} value={value} />
          )}
        />
        <Table.Column
          dataIndex="status"
          title="Статус"
          render={(value: UserStatus) => <TagField value={value} />}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Radio.Group>
                <Radio value="CONFIRMED">Подтвержден</Radio>
                <Radio value="IN_CHECK">В проверке</Radio>
                <Radio value="BANNED">Забанен</Radio>
              </Radio.Group>
            </FilterDropdown>
          )}
        />
        <Table.Column<IUser>
          dataIndex="skillForm"
          title="Анкета"
          render={(value: null) => (Boolean(value) ? "Анкета " : "Нет")}
        />

        <Table.Column<IUser>
          title="Действия"
          align="center"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <Tooltip title="Изменить">
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
