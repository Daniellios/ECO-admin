import {
  Button,
  Card,
  EditButton,
  Form,
  SaveButton,
  Space,
  Table,
  TextField,
  Typography,
  useEditableTable,
} from "@pankod/refine-antd";
import { IResourceComponentsProps, useResource } from "@pankod/refine-core";
import React from "react";
import { IContractJob } from "../..";

interface IContractJobsTableProps {
  contractId: string | undefined;
}

const ContractJobsTable: React.FC<IContractJobsTableProps> = ({
  contractId,
}) => {
  const { resource } = useResource({
    resourceNameOrRouteName: "contracts",
  });

  const {
    tableProps,
    formProps,
    saveButtonProps,
    isEditing,
    setId: setEditId,
    cancelButtonProps,
    editButtonProps,
    tableQueryResult,
  } = useEditableTable<IContractJob>({
    resource: `${resource.name}/job/${contractId}`,
  });

  return (
    <Card>
      <Typography.Title level={3}>Список работ </Typography.Title>
      <Form {...formProps}>
        <Table
          {...tableProps}
          rowKey="id"
          loading={tableQueryResult.isLoading}
          pagination={false}
          onRow={(record) => ({
            // eslint-disable-next-line
            onClick: (event: any) => {
              if (event.target.nodeName === "TD") {
                setEditId && setEditId(record.id);
              }
            },
          })}
        >
          <Table.Column
            title="Наименование услуги"
            dataIndex={"serviceName"}
            render={(value) => <TextField value={value}> </TextField>}
          ></Table.Column>
          <Table.Column
            title="Объем  работ"
            dataIndex={"serviceVolume"}
            render={(value) => <TextField value={value}> </TextField>}
          ></Table.Column>
          <Table.Column
            title="Регион"
            dataIndex={"region"}
            render={(value) => <TextField value={value}> </TextField>}
          ></Table.Column>
          <Table.Column
            title="Адрес"
            dataIndex={"address"}
            render={(value) => <TextField value={value}> </TextField>}
          ></Table.Column>
          <Table.Column<IContractJob>
            title="Действия"
            dataIndex={"actions"}
            render={(_, record) => {
              if (isEditing(record.id)) {
                return (
                  <Space>
                    <SaveButton {...saveButtonProps} hideText size="small" />
                    <Button {...cancelButtonProps} size="small">
                      Cancel
                    </Button>
                  </Space>
                );
              }
              return (
                <EditButton
                  {...editButtonProps(record.id)}
                  hideText
                  size="small"
                />
              );
            }}
          ></Table.Column>
        </Table>
      </Form>
    </Card>
  );
};

export default ContractJobsTable;
