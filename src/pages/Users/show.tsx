import {
  useShow,
  IResourceComponentsProps,
  useOne,
  useDelete,
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
} from "@pankod/refine-antd";

import { IUser } from "../../interfaces";
import MyDeleteButton from "../../components/MyDeleteButton";
import MyRefreshButton from "../../components/MyRefreshButton";

const { Title, Text } = Typography;

export const UserShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<IUser>();

  const { data, isLoading, isError } = queryResult;
  const record = data?.data;

  const { data: categoryData, isLoading: categoryIsLoading } = useOne<IUser>({
    resource: "users",
    id: record?.id || "",
  });

  const fullName = `${record?.firstName} ${record?.secondName} ${record?.thirdName}`;

  return (
    <Show
      isLoading={isLoading}
      title={"Эколог"}
      headerButtons={() => (
        <>
          <MyRefreshButton></MyRefreshButton>
          <MyDeleteButton></MyDeleteButton>
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
          <Col span={12}>
            <Title level={5}>Роль</Title>
            <Text>{record?.roles}</Text>
          </Col>
        </Row>
        <Divider></Divider>

        <Row align={"middle"} justify="start">
          <Col span={12}>
            <Title level={5}>Текущая загруженность</Title>
            <Text>{record?.workLoad}</Text>
          </Col>

          <Col span={12}>
            <Title level={5}>Маскимальная загруженность</Title>
            <Text>{record?.workLoadLimit}</Text>
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

        <Row align={"middle"} justify="start">
          <Col span={12}>
            <Title level={5}>Анкета</Title>
            <Text type={record?.skillForm ? undefined : "danger"}>
              {record?.skillForm
                ? record.skillForm
                : "Квалификационная анкета отстутсвует"}
            </Text>
          </Col>
          <Col span={12}>
            <Title level={5}>Менеджер</Title>
            <Text>
              {record?.manager ? record.manager : "Менеджер не назначен"}
            </Text>
          </Col>
        </Row>
      </>
    </Show>
  );
};
