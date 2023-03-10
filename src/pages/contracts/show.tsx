import {
  CheckCircleOutlined,
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Collapse,
  Divider,
  EditButton,
  Row,
  Show,
  ShowButton,
  Space,
  Table,
  TextField,
  Timeline,
  useTable,
  Title,
  Tooltip,
  Typography,
  useEditableTable,
  Form,
  SaveButton,
  useModalForm,
  DatePicker,
  useForm,
} from "@pankod/refine-antd";
import {
  HttpError,
  IResourceComponentsProps,
  useDelete,
  usePermissions,
  useResource,
  useShow,
  useUpdate,
} from "@pankod/refine-core";
import { IContract, IContractJob } from "../..";
import MyDeleteButton from "../../components/buttons/MyDeleteButton";
import MyEditButton from "../../components/buttons/MyEditButton";
import MyRefreshButton from "../../components/buttons/MyRefreshButton";
import MyShowButton from "../../components/buttons/MyShowButton";
import CyrilicTextField from "../../components/forms/fields/CyrilicTextFIeld";
import DatePickerField from "../../components/forms/fields/DatePickerField";
import PositiveNumberField from "../../components/forms/fields/PositiveNumberField";
import ModalActionForm from "../../components/modals/ModalActionForm";
import PageTitle from "../../components/shared/PageTitle";

import ContractJobsTable from "../../components/tables/ContractJobsTable";
import DateCell from "../../components/tables/DateCell";
import { ContractStatusTag } from "../../components/tags/ContractStatus";

export const ContractShow: React.FC<IResourceComponentsProps> = () => {
  const { resource } = useResource({
    resourceNameOrRouteName: "contracts",
  });

  const { mutate: ecologistMutation } = useUpdate();

  const { data: identity, isFetched } = usePermissions({});

  const { queryResult } = useShow<IContract, HttpError>({
    liveMode: "auto",
  });
  const { data, isLoading, refetch } = queryResult;
  const record = data?.data;

  const ecologist = record?.ecologist;
  const company = record?.company;
  const candidates = record?.candidates;

  console.log(candidates);

  const contractStatus = record?.status;

  const isAdmin = identity?.roles === "ADMIN";

  const { formProps, form, onFinish } = useForm({ action: "edit" });

  const assignEcologistToContract = async (ecologistId: number) => {
    ecologistMutation({
      successNotification: {
        type: "success",
        message: `Эколог успешно назначен на заказ ${record?.id}`,
      },

      resource: `${resource.name}/assignEcologist`,
      id: record?.id || "",
      values: {
        id: ecologistId,
      },
    });
  };

  const removeEcologistFromContract = async () => {
    ecologistMutation({
      successNotification: {
        type: "success",
        message: `Эколог был снят с заказа ${record?.id}`,
      },
      resource: `${resource.name}/removeEcologist`,
      id: record?.id || "",
      values: {
        id: "",
      },
    });
  };

  return (
    <Show
      isLoading={isLoading}
      canEdit={true}
      canDelete={isAdmin}
      title={<PageTitle title="Заказ" id={record?.id} />}
      headerButtons={
        <>
          <MyDeleteButton
            resource={resource.name}
            successNotification={{
              message: `Заказ  ${record?.id} был успешно удален `,
              type: "success",
            }}
          ></MyDeleteButton>
          <MyEditButton resource={resource.name}></MyEditButton>
          <MyRefreshButton resource={resource.name}></MyRefreshButton>
        </>
      }
    >
      <Card>
        <Row align={"middle"} justify="space-between">
          <Typography.Title level={3}>Общая информация </Typography.Title>
          <ContractStatusTag status={record?.status}></ContractStatusTag>
        </Row>

        <Divider></Divider>

        <Row>
          <Col span={22}>
            <Typography.Title level={5}>Описание</Typography.Title>
            <Typography.Text>{record?.description || "Нет"}</Typography.Text>
          </Col>
        </Row>
        <Divider></Divider>

        <Row>
          <Col span={6}>
            <Typography.Title level={5}>Обновлено</Typography.Title>
            <DateCell value={record?.updatedAt}></DateCell>
          </Col>

          <Col span={6}>
            <Typography.Title level={5}>Создано</Typography.Title>
            <DateCell value={record?.createdAt}></DateCell>
          </Col>

          <Col span={6}>
            <Typography.Title level={5}>Начало работ</Typography.Title>
            <DateCell value={record?.startAt}></DateCell>
          </Col>

          <Col span={6}>
            <Typography.Title level={5}>Конец работ</Typography.Title>
            <DateCell value={record?.endAt}></DateCell>
          </Col>
        </Row>
        {/* 
        <Form {...formProps} layout="vertical">
      
       
              <DatePickerField
                fromItemProps={{ name: "startAt" }}
                datePickerProps={{ placeholder: "Дата начала" }}
              ></DatePickerField>
          
            <DatePickerField
            fromItemProps={{ name: "endAt" }}
            datePickerProps={{ placeholder: "Дата конца" }}
          ></DatePickerField>


          <CyrilicTextField
            isTextArea
            fromItemProps={{ name: "description" }}
            inputProps={{ placeholder: "Описание" }}
          ></CyrilicTextField>
          <PositiveNumberField
            fromItemProps={{
              label: "Сумма всего",
              name: "totalPrice",
              initialValue: null,
            }}
            inputProps={{
              placeholder: "Сумма",
            }}
          ></PositiveNumberField>
        </Form> */}

        <Divider></Divider>
        <Row>
          <Col span={6}>
            <Typography.Title level={5}>Сумма</Typography.Title>
            <Typography.Text> {record?.totalPrice}</Typography.Text>
          </Col>
          <Col span={6}>
            <Typography.Title level={5}>Сумма выплат экологу</Typography.Title>
            <Typography.Text> {record?.paymentAmount}</Typography.Text>
          </Col>
        </Row>
      </Card>

      <ContractJobsTable contractId={record?.id}></ContractJobsTable>

      {contractStatus !== "IN_WORK" && contractStatus !== "COMPLETED" && (
        <Card>
          <>
            <Typography.Title level={3}>Кандидаты</Typography.Title>
            {candidates && candidates?.length > 0 && (
              <Row align={"middle"} justify="space-between">
                <Col span={6}>
                  <Typography.Title level={5}>Ф.И.О</Typography.Title>
                </Col>
                <Col span={6}>
                  <Typography.Title level={5}>Телефон</Typography.Title>
                </Col>
                <Col span={6}>
                  <Typography.Title level={5}>Почта</Typography.Title>
                </Col>
                <Col span={6}>
                  <Typography.Title level={5}>Действие</Typography.Title>
                </Col>
              </Row>
            )}

            {candidates && candidates?.length < 1 && (
              <Typography.Title level={4} className="sub_text">
                Кандидатов на выполнение заказа пока нет
              </Typography.Title>
            )}

            {candidates &&
              candidates?.map((ecologist) => {
                return (
                  <Row
                    align={"middle"}
                    justify="space-between"
                    style={{ marginBottom: 8 }}
                  >
                    <Col span={6}>
                      <Typography.Text>
                        {`${ecologist.firstName} ${ecologist.secondName} ${ecologist.thirdName}`}
                      </Typography.Text>
                    </Col>
                    <Col span={6}>
                      <Typography.Text>
                        {ecologist.phone || "Не указан"}
                      </Typography.Text>
                    </Col>
                    <Col span={6}>
                      <Typography.Text>{ecologist?.email}</Typography.Text>
                    </Col>
                    <Col span={6}>
                      <Space>
                        <MyShowButton
                          hideText
                          title="Перейти к экологу"
                          size="small"
                          resourceNameOrRouteName="users"
                          recordItemId={ecologist.id}
                          icon
                        />
                        <MyEditButton
                          hideText
                          onClick={() =>
                            assignEcologistToContract(ecologist.id)
                          }
                          title="Назначить на заказ"
                          icon={<CheckOutlined />}
                          size="small"
                        ></MyEditButton>
                      </Space>
                    </Col>
                  </Row>
                );
              })}
          </>
        </Card>
      )}

      {company && (
        <Card>
          <Typography.Title level={3}>Заказчик</Typography.Title>

          <Row align={"middle"}>
            <Col span={6}>
              <Typography.Title level={5}>Наименование</Typography.Title>
              <Typography.Text>
                {company.companyName || "Не указано"}
              </Typography.Text>
            </Col>
            <Col span={4}>
              <Typography.Title level={5}>Сфера</Typography.Title>
              <Typography.Text>
                {company.companySphere || "Не указано"}
              </Typography.Text>
            </Col>
            <Col span={6}>
              <Typography.Title level={5}>Почта</Typography.Title>
              <Typography.Text>{company.email || "Не указана"}</Typography.Text>
            </Col>
            <Col span={6}>
              <Typography.Title level={5}>Телефон</Typography.Title>
              <Typography.Text>{company.phone || "Не указан"}</Typography.Text>
            </Col>
            <Col span={2}>
              {record?.id && (
                <MyShowButton
                  hideText
                  title="Перейти к компании"
                  size="large"
                  resource="companies"
                  recordItemId={record.id}
                  icon
                />
              )}
            </Col>
          </Row>
        </Card>
      )}

      {contractStatus === "IN_WORK" && (
        <Card>
          <Typography.Title level={3}>Исполнитель </Typography.Title>
          <Row align="middle">
            <Col span={10}>
              <Typography.Title level={5}>Ф.И.О</Typography.Title>
              <Typography.Text>
                {ecologist?.firstName
                  ? `${ecologist.firstName} ${ecologist.secondName} ${ecologist.thirdName}`
                  : "Не указан"}
              </Typography.Text>
            </Col>
            <Col span={6}>
              <Typography.Title level={5}>Почта</Typography.Title>
              <Typography.Text>
                {ecologist?.email || "Не указана"}
              </Typography.Text>
            </Col>
            <Col span={6}>
              <Typography.Title level={5}>Телефон</Typography.Title>
              <Typography.Text>
                {ecologist?.phone || "Не указан"}
              </Typography.Text>
            </Col>
            {ecologist?.id && (
              <Col span={2}>
                <MyShowButton
                  hideText
                  title="Перейти к экологу"
                  size="large"
                  resourceNameOrRouteName="users"
                  recordItemId={ecologist.id}
                  icon
                />
                <MyEditButton
                  hideText
                  onClick={removeEcologistFromContract}
                  title="Снять с заказа"
                  icon={<CloseOutlined />}
                  size="large"
                ></MyEditButton>
              </Col>
            )}
          </Row>
        </Card>
      )}
    </Show>
  );
};
