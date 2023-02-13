import { HttpError, IResourceComponentsProps } from "@pankod/refine-core";
import {
  useTable,
  useSelect,
  DateField,
  TextField,
  useModalForm,
  Space,
  Tooltip,
  EditButton,
  Modal,
  Form,
  Input,
  Select,
  Button,
} from "@pankod/refine-antd";
import React from "react";
import { BooleanField, EmailField, List, Table } from "@pankod/refine-antd";
import { IApplication } from "../../interfaces";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import MySaveButton from "../../components/MySaveButton";

// TODO  MAKE NEW DATA PROVIDER FOR

//https://refine.dev/docs/api-reference/antd/hooks/form/useModalForm/
export const ApplicationsList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps, filters, tableQueryResult } = useTable<
    IApplication,
    HttpError
  >({
    syncWithLocation: true,
    initialPageSize: 15,
    resource: "applications",
    dataProviderName: "applications",
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
              return <DateField value={value}> </DateField>;
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
              <BooleanField
                value={value}
                valueLabelFalse="Не обработана"
                valueLabelTrue="Обработана"
                trueIcon={<CheckOutlined style={{ color: "#52c41a" }} />}
                falseIcon={<CloseOutlined style={{ color: "#ff4d4f" }} />}
              />
            )}
          />

          <Table.Column<IApplication>
            title="Действия"
            align="center"
            render={(_, record) => (
              <Space>
                <Tooltip title="Изменить">
                  <EditButton
                    hideText
                    size="small"
                    recordItemId={record.id}
                    onClick={() => editModalShow(record.id)}
                  />
                </Tooltip>
              </Space>
            )}
          />
        </Table>
      </List>

      <Modal
        {...editModalProps}
        title="Заявка"
        width={"600px"}
        cancelText="Отмена"
        okText="Сохранить"
      >
        <Form {...editFormProps} layout="vertical">
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
        </Form>
      </Modal>
    </>
  );
};
