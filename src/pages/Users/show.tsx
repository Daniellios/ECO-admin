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
import EditModal from "../../components/modals/ModalActionForm";
import NameField from "../../components/forms/fields/NameField";
import PhoneField from "../../components/forms/fields/PhoneField";
import UserStatusField from "../../components/forms/fields/UserStatusField";
import BooleanCell from "../../components/tables/BooleanCell";
import DateCell from "../../components/tables/DateCell";
import UserSkillEditModalForm from "../../components/modals/edit/UserSkillEditModalForm";
import UserProfileEditModalForm from "../../components/modals/edit/UserProfileEditModalForm";
import UserSkillCreateModalForm from "../../components/modals/create/UserSkillCreateModalForm";
import MyCreateButton from "../../components/buttons/MyCreateButton";

const { Title, Text } = Typography;

export const UserShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<IUser>();
  const { data: identity, isFetched } = usePermissions({});

  const { data, isLoading, isError } = queryResult;
  const record = data?.data;

  const skillForm = record?.skillForm;

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
    redirect: false,
    autoSubmitClose: true,
    action: "edit",
    warnWhenUnsavedChanges: false,
  });

  const {
    modalProps: createSkillModalProps,
    formProps: createSkillFormProps,
    show: createSkillModalShow,
  } = useModalForm<IUserSkillForm>({
    resource: `users/${record?.id}/skills`,
    redirect: false,
    autoSubmitClose: true,
    action: "create",
    warnWhenUnsavedChanges: false,
  });

  return (
    <Show
      isLoading={isLoading}
      title={"Профиль эколога"}
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
          {skillForm && (
            <MyEditButton
              title="Анкета"
              onClick={() => editSkillModalShow()}
            ></MyEditButton>
          )}
          {!skillForm && (
            <MyCreateButton
              title="Заполнить анкету"
              onClick={() => createSkillModalShow()}
            ></MyCreateButton>
          )}

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

        {skillForm ? (
          <>
            <Row align={"middle"} justify="center">
              <Col span={12}>
                <Title level={5}>Проверена</Title>

                <BooleanCell
                  value={record?.skillForm?.isApproved}
                ></BooleanCell>
              </Col>
              <Col span={12}>
                <Title level={5}>Заполнена</Title>
                <BooleanCell
                  value={record?.skillForm?.isCompleted}
                ></BooleanCell>
              </Col>
            </Row>

            <Divider></Divider>

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
        ) : (
          <Title level={5}>Отсутствует</Title>
        )}
      </>

      <UserSkillCreateModalForm
        modalProps={{
          ...createSkillModalProps,
          title: "Создать анкету",
        }}
        formProps={createSkillFormProps}
      ></UserSkillCreateModalForm>

      <UserSkillEditModalForm
        modalProps={{
          ...editSkillModalProps,
          title: "Редактировать анкету",
        }}
        formProps={editSkillFormProps}
      ></UserSkillEditModalForm>

      <UserProfileEditModalForm
        modalProps={{
          ...editModalProps,
          title: "Редактировать профиль",
        }}
        formProps={editFormProps}
      ></UserProfileEditModalForm>
    </Show>
  );
};
