import {
  Col,
  Form,
  Modal,
  Row,
  Select,
  Typography,
  Show,
  useModalForm,
  Divider,
} from "@pankod/refine-antd";
import {
  IResourceComponentsProps,
  usePermissions,
  useResource,
  useShow,
} from "@pankod/refine-core";
import MyDeleteButton from "../../components/buttons/MyDeleteButton";
import MyEditButton from "../../components/buttons/MyEditButton";
import MyRefreshButton from "../../components/buttons/MyRefreshButton";
import StaffField from "../../components/forms/fields/StaffField";
import ModalActionForm from "../../components/modals/ModalActionForm";
import { IStaffMember } from "../..";

//TODO Make form compnent for creating and updating
export const StaffShow: React.FC<IResourceComponentsProps> = () => {
  const { data: identity, isFetched } = usePermissions({});

  const { queryResult } = useShow<IStaffMember>();

  const { resource } = useResource({
    resourceNameOrRouteName: "cmp",
  });

  const isAdmin = identity?.roles === "ADMIN";

  const { data, isLoading } = queryResult;
  const record = data?.data;

  const {
    modalProps: editModalProps,
    formProps: editFormProps,
    show: editModalShow,
  } = useModalForm<IStaffMember>({
    autoSubmitClose: true,
    action: "edit",
    warnWhenUnsavedChanges: false,
  });

  const fullName = `${record?.firstName} ${record?.secondName}`;

  //
  return (
    <Show
      isLoading={isLoading}
      title={"Просмотр"}
      canEdit={true}
      canDelete={isAdmin}
      headerButtons={
        <>
          <MyEditButton
            resource={resource.name}
            onClick={() => editModalShow(record?.id)}
          ></MyEditButton>
          <MyDeleteButton
            resource={resource.name}
            successNotification={{
              message: `Сотрудник  ${record?.id} был успешно удален `,
              type: "success",
            }}
          ></MyDeleteButton>
          <MyRefreshButton resource={resource.name}></MyRefreshButton>
        </>
      }
    >
      <Row align={"middle"} justify="start">
        <Col span={12}>
          <Typography.Title level={5}>ID</Typography.Title>
          <Typography.Text>{record?.id}</Typography.Text>
        </Col>
        <Col span={12}>
          <Typography.Title level={5}>Роль</Typography.Title>
          <Typography.Text>{record?.roles}</Typography.Text>
        </Col>

        <Divider></Divider>

        <Col span={8}>
          <Typography.Title level={5}>Имя</Typography.Title>
          <Typography.Text>{fullName}</Typography.Text>
        </Col>

        <Col span={8}>
          <Typography.Title level={5}>Почта</Typography.Title>
          <Typography.Text>{record?.email}</Typography.Text>
        </Col>

        <Col span={8}>
          <Typography.Title level={5}>Телефон</Typography.Title>
          <Typography.Text>{record?.phone}</Typography.Text>
        </Col>
      </Row>

      <ModalActionForm
        modalProps={{
          ...editModalProps,
          title: "Редактировать аккаунт сотрудника",
        }}
        formProps={editFormProps}
      >
        <StaffField role={isAdmin}></StaffField>
      </ModalActionForm>
    </Show>
  );
};
