import {
  useShow,
  IResourceComponentsProps,
  useOne,
  useDelete,
  useResource,
  usePermissions,
} from "@pankod/refine-core";

import {
  Show,
  Typography,
  Divider,
  MarkdownField,
  Grid,
  Breadcrumb,
  DateField,
  TextField,
  EmailField,
  Card,
  Row,
  Col,
  AntdBreadcrumb,
  BooleanField,
  Modal,
  Form,
  useModalForm,
  Select,
  Input,
} from "@pankod/refine-antd";

import { IUser } from "../../interfaces";
import MyDeleteButton from "../../components/buttons/MyDeleteButton";
import MyRefreshButton from "../../components/buttons/MyRefreshButton";
import CustomBreadCrumb from "../../components/shared/CustomBreadCrumb";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import MyEditButton from "../../components/buttons/MyEditButton";

const { Title, Text } = Typography;

export const UserShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<IUser>();
  const { data: identity, isFetched } = usePermissions({});

  const { data, isLoading, isError } = queryResult;
  const record = data?.data;

  const { data: categoryData, isLoading: categoryIsLoading } = useOne<IUser>({
    resource: "users",

    id: record?.id || "",
  });

  const fullName = `${record?.firstName} ${record?.secondName} ${record?.thirdName}`;
  const isAdmin = identity?.roles === "ADMIN";

  const {
    modalProps: editModalProps,
    formProps: editFormProps,
    show: editModalShow,
  } = useModalForm<IUser>({
    autoSubmitClose: true,
    action: "edit",
    warnWhenUnsavedChanges: false,
  });

  return (
    <Show
      isLoading={isLoading}
      title={"Просмотр"}
      canEdit={true}
      // breadcrumb={<CustomBreadCrumb />}
      headerButtons={() => (
        <>
          <MyRefreshButton></MyRefreshButton>
          <MyEditButton
            onClick={() => editModalShow(record?.id)}
          ></MyEditButton>
          {isAdmin && <MyDeleteButton resource="users"></MyDeleteButton>}
        </>
      )}
    >
      <>
        <Row align={"middle"} justify="start">
          <Col span={12}>
            <Title level={5}>ID</Title>
            <Text>{record?.id}</Text>
          </Col>
          <Col span={12}>
            <Title level={5}>Ф.И.О</Title>
            <Text>{fullName.length > 2 ? fullName : "-"}</Text>
          </Col>
        </Row>

        <Divider></Divider>

        <Row align={"middle"} justify="start">
          <Col span={8}>
            <Title level={5}>Телефон</Title>
            <Text>{record?.phone ? record.phone : "-"}</Text>
          </Col>
          <Col span={8}>
            <Title level={5}>Почта</Title>
            <EmailField value={record?.email}> </EmailField>
          </Col>
          <Col span={8}>
            <Title level={5}>Статус почты</Title>
            <Text type={record?.isEmailConfirmed ? "success" : "danger"}>
              {record?.isEmailConfirmed ? "Подтверждена" : "Не подтверждена"}
            </Text>
          </Col>
        </Row>

        <Divider></Divider>

        <Row align={"middle"} justify="start">
          <Col span={12}>
            <Title level={5}>Статус учетной записи</Title>
            <Text
              type={
                record?.status === "CONFIRMED"
                  ? "success"
                  : record?.status === "IN_CHECK"
                  ? "warning"
                  : record?.status === "BANNED"
                  ? "danger"
                  : undefined
              }
            >
              {record?.status === "CONFIRMED"
                ? "Подтвеждена"
                : record?.status === "IN_CHECK"
                ? "В проверке"
                : record?.status === "BANNED"
                ? "Забанен"
                : ""}
            </Text>
          </Col>

          {isAdmin && (
            <Col span={12}>
              <Title level={5}>Роль</Title>
              <Text>{record?.roles}</Text>
            </Col>
          )}
        </Row>
        <Divider></Divider>

        <Row align={"middle"} justify="start">
          <Col span={8}>
            <Title level={5}>Текущая загруженность</Title>
            <Text>{record?.workLoad}</Text>
          </Col>

          <Col span={8}>
            <Title level={5}>Маскимальная загруженность</Title>
            <Text>{record?.workLoadLimit}</Text>
          </Col>

          <Col span={8}>
            <Title level={5}>Менеджер</Title>
            <Text>{record?.manager ? record.manager : "Не назначен"}</Text>
          </Col>
        </Row>
        <Divider></Divider>

        <Row align={"middle"} justify="start">
          <Col span={12}>
            <Title level={5}>Аккаунт создан</Title>
            <DateField value={record?.createdAt}></DateField>
          </Col>
          <Col span={12}>
            <Title level={5}>Аккаунт обновлен</Title>
            <DateField value={record?.updatedAt}></DateField>
          </Col>
        </Row>
        <Divider></Divider>

        <Title level={5}>Квалификационная анкета</Title>
        <Divider></Divider>

        <Row align={"middle"} justify="center">
          <Col span={12}>
            <Title level={5}>Проверена</Title>
            <BooleanField
              value={record?.skillForm.isApproved}
              trueIcon={<CheckOutlined style={{ color: "#52c41a" }} />}
              falseIcon={<CloseOutlined style={{ color: "#ff4d4f" }} />}
            ></BooleanField>
          </Col>
          <Col span={12}>
            <Title level={5}>Заполнена</Title>
            <BooleanField
              value={record?.skillForm.isCompleted}
              trueIcon={<CheckOutlined style={{ color: "#52c41a" }} />}
              falseIcon={<CloseOutlined style={{ color: "#ff4d4f" }} />}
            ></BooleanField>
          </Col>
        </Row>
        <Divider></Divider>

        <Row align={"middle"} justify="center">
          <Col span={12}>
            <Title level={5}>Дата создания анкеты</Title>
            <DateField value={record?.skillForm.createdAt}></DateField>
          </Col>
          <Col span={12}>
            <Title level={5}>Дата заполнения анкеты</Title>
            <DateField value={record?.skillForm.updatedAt}></DateField>
          </Col>
        </Row>
      </>

      <Modal
        {...editModalProps}
        title="Редактировать аккаунт эколога "
        closable={true}
        cancelText="Отмена"
        okText="Сохранить"
      >
        <Form {...editFormProps} layout="vertical" size="small">
          <Row align="middle" justify="start">
            <Col span={4}>
              <Form.Item
                label="Имя"
                name="firstName"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={4} push={1}>
              <Form.Item
                label="Фамилия"
                name="secondName"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={4} push={2}>
              <Form.Item
                label="Отчество"
                name="thirdName"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row align="middle" justify="start">
            <Col span={4}>
              <Form.Item
                label="Телефон"
                name="phone"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={4} push={1}>
              <Form.Item
                label="Статус"
                name="status"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Select
                  dropdownMatchSelectWidth={false}
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
            </Col>
          </Row>
        </Form>
      </Modal>
    </Show>
  );
};
