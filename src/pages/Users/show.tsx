import {
  useShow,
  IResourceComponentsProps,
  useOne,
  usePermissions,
} from "@pankod/refine-core";

import {
  Show,
  Typography,
  Divider,
  DateField,
  EmailField,
  Row,
  Col,
  Form,
  useModalForm,
  Select,
} from "@pankod/refine-antd";

import { IUser, IUserSkillForm } from "../../interfaces";
import MyDeleteButton from "../../components/buttons/MyDeleteButton";
import MyRefreshButton from "../../components/buttons/MyRefreshButton";
import CustomBreadCrumb from "../../components/shared/CustomBreadCrumb";
import MyEditButton from "../../components/buttons/MyEditButton";
import EditModal from "../../components/modals/EditModal";
import NameField from "../../components/forms/fields/NameField";
import PhoneField from "../../components/forms/fields/PhoneField";
import UserStatusField from "../../components/forms/fields/UserStatusField";
import BooleanCell from "../../components/tables/BooleanCell";
import DateCell from "../../components/tables/DateCell";

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

  const {
    modalProps: editSkillModalProps,
    formProps: editSkillFormProps,
    show: editSkillModalShow,
  } = useModalForm<IUserSkillForm>({
    resource: `users/${record?.id}/skills`,
    autoSubmitClose: true,
    action: "edit",
    warnWhenUnsavedChanges: false,
  });

  return (
    <Show
      isLoading={isLoading}
      title={"Просмотр"}
      canEdit={true}
      canDelete={isAdmin}
      // breadcrumb={<CustomBreadCrumb />}
      headerButtons={() => (
        <>
          <MyRefreshButton></MyRefreshButton>
          <MyEditButton
            title="Редактировать"
            onClick={() => editModalShow(record?.id)}
          ></MyEditButton>
          <MyEditButton
            title="Анкета"
            onClick={() => editSkillModalShow()}
          ></MyEditButton>
          <MyDeleteButton resource="users"></MyDeleteButton>
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

        {/* АНКЕТА */}

        <Divider style={{ background: "black" }}></Divider>

        <Title level={5}>Квалификационная анкета</Title>
        <Divider></Divider>

        <Row align={"middle"} justify="center">
          <Col span={12}>
            <Title level={5}>Проверена</Title>

            <BooleanCell value={record?.skillForm?.isApproved}></BooleanCell>
          </Col>
          <Col span={12}>
            <Title level={5}>Заполнена</Title>
            <BooleanCell value={record?.skillForm?.isCompleted}></BooleanCell>
          </Col>
        </Row>
        <Divider></Divider>

        <EditModal
          modalProps={{
            ...editSkillModalProps,
            title: "Редактировать анкету ",
          }}
          formProps={editSkillFormProps}
        >
          <Form.Item
            label="Готовность"
            name="isCompleted"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Select
              options={[
                {
                  label: "Заполнена",
                  value: true,
                },
                {
                  label: "Не заполнена",
                  value: false,
                },
              ]}
            ></Select>
          </Form.Item>
        </EditModal>

        <Row align={"middle"} justify="center">
          <Col span={12}>
            <Title level={5}>Дата создания анкеты</Title>

            <DateCell value={record?.skillForm?.createdAt}></DateCell>
          </Col>
          <Col span={12}>
            <Title level={5}>Дата обновления анкеты</Title>
            <DateCell value={record?.skillForm.updatedAt}></DateCell>
          </Col>
        </Row>
      </>

      <EditModal
        modalProps={{
          ...editModalProps,
          title: "Редактировать аккаунт эколога ",
        }}
        formProps={editFormProps}
      >
        <Row align="middle" justify="start">
          <Col span={4}>
            <NameField
              label="Имя"
              name={"firstName"}
              required={false}
            ></NameField>
          </Col>

          <Col span={4} push={1}>
            <NameField
              label="Фамилия"
              name={"secondName"}
              required={false}
            ></NameField>
          </Col>

          <Col span={4} push={2}>
            <NameField
              label="Отчество"
              name={"thirdName"}
              required={false}
            ></NameField>
          </Col>
        </Row>

        <Row align="middle" justify="start">
          <Col span={4}>
            <PhoneField required={false}></PhoneField>
          </Col>

          <Col span={4} push={1}>
            <UserStatusField></UserStatusField>
          </Col>
        </Row>
      </EditModal>
    </Show>
  );
};
