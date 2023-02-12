import { HttpError, IResourceComponentsProps } from "@pankod/refine-core";
import { useTable, useSelect, DateField } from "@pankod/refine-antd";
import React from "react";
import { BooleanField, EmailField, List, Table } from "@pankod/refine-antd";
import { IApplication } from "../../interfaces";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

export const ApplicationsList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps, filters, tableQueryResult } = useTable<
    IApplication,
    HttpError
  >({ syncWithLocation: true, initialPageSize: 15 });

  return (
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
          align="left"
          ellipsis
        />
        <Table.Column
          dataIndex="email"
          title="Почта"
          align="left"
          render={(value: string) => {
            return <EmailField value={value}></EmailField>;
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
          align="left"
          sorter={{
            compare: (a, b) => Number(a.isProcessed) - Number(b.isProcessed),
          }}
          showSorterTooltip={{ title: "Отсортировать по обработке" }}
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
      </Table>
    </List>
  );
};
