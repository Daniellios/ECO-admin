import {
  Card,
  Col,
  Collapse,
  Divider,
  Row,
  Show,
  ShowButton,
  Title,
  Typography,
} from "@pankod/refine-antd";
import {
  HttpError,
  IResourceComponentsProps,
  usePermissions,
  useResource,
  useShow,
} from "@pankod/refine-core";
import { IContract } from "../..";
import MyDeleteButton from "../../components/buttons/MyDeleteButton";
import MyRefreshButton from "../../components/buttons/MyRefreshButton";
import MyShowButton from "../../components/buttons/MyShowButton";
import { ContractStatusTag } from "../../components/ContractStatus";
import DateCell from "../../components/tables/DateCell";

const ContractShow: React.FC<IResourceComponentsProps> = () => {
  const { resource } = useResource({
    resourceNameOrRouteName: "contracts",
  });

  const { data: identity, isFetched } = usePermissions({});

  const { queryResult } = useShow<IContract, HttpError>({});
  const { data, isLoading } = queryResult;
  const record = data?.data;

  const ecologist = record?.ecologist;
  const company = record?.company;

  const services = record?.contractJobs;

  const contractStatus = record?.status;

  const isAdmin = identity?.roles === "ADMIN";

  console.log(ecologist?.id);

  return (
    <Show
      isLoading={isLoading}
      canEdit={true}
      canDelete={isAdmin}
      title={`Заказ ${record?.id}`}
      headerButtons={
        <>
          <MyDeleteButton
            resource={resource.name}
            successNotification={{
              message: `Заказ  ${record?.id} был успешно удален `,
              type: "success",
            }}
          ></MyDeleteButton>
          <MyRefreshButton resource={resource.name}></MyRefreshButton>
        </>
      }
    >
      <Card>
        <Typography.Title level={3}>Общая информация </Typography.Title>
        <Divider></Divider>

        <Row>
          <Col span={2}>
            <Typography.Title level={5}>Статус</Typography.Title>
            <ContractStatusTag status={record?.status}></ContractStatusTag>
          </Col>
          <Col span={22}>
            <Typography.Title level={5}>Описание</Typography.Title>
            <Typography.Text>
              {record?.description ? record.description : "Нет"}
            </Typography.Text>
          </Col>
        </Row>
        <Divider></Divider>

        <Row>
          <Col span={6}>
            <Typography.Title level={5}>Обновлено</Typography.Title>
            <DateCell value={record?.createdAt}></DateCell>
          </Col>

          <Col span={6}>
            <Typography.Title level={5}>Создано</Typography.Title>
            <DateCell value={record?.createdAt}></DateCell>
          </Col>

          <Col span={6}>
            <Typography.Title level={5}>Начало работ</Typography.Title>
            <DateCell value={record?.createdAt}></DateCell>
          </Col>

          <Col span={6}>
            <Typography.Title level={5}>Конец работ</Typography.Title>
            <DateCell value={record?.createdAt}></DateCell>
          </Col>
        </Row>

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

        <Divider></Divider>
        <Row>
          {contractStatus === "IN_WORK" || "COMPLETED" ? (
            <></>
          ) : (
            <Col span={6}>
              <Typography.Title level={5}>
                Кандидаты на выполнение
              </Typography.Title>
              <Typography.Text> {record?.hasCandidates}</Typography.Text>
            </Col>
          )}
        </Row>
      </Card>

      {record?.contractJobs && record.contractJobs.length > 0 && (
        <Card>
          <Typography.Title level={3}>Услуги </Typography.Title>
        </Card>
      )}

      {contractStatus !== "IN_WORK" && contractStatus !== "COMPLETED" && (
        <Card>
          <Typography.Title level={3}>Кандидаты</Typography.Title>
        </Card>
      )}

      <Card>
        <Typography.Title level={3}>Заказчик</Typography.Title>

        <Row align={"middle"}>
          <Col span={6}>
            <Typography.Title level={5}>Наименование</Typography.Title>
            <Typography.Text>
              {company?.companyName ? company.companyName : "Не указано"}
            </Typography.Text>
          </Col>
          <Col span={4}>
            <Typography.Title level={5}>Сфера</Typography.Title>
            <Typography.Text>
              {company?.companySphere ? company.companySphere : "Не указано"}
            </Typography.Text>
          </Col>
          <Col span={6}>
            <Typography.Title level={5}>Почта</Typography.Title>
            <Typography.Text>
              {company?.email ? company.email : "Не указана"}
            </Typography.Text>
          </Col>
          <Col span={6}>
            <Typography.Title level={5}>Телефон</Typography.Title>
            <Typography.Text>
              {company?.phone ? company.phone : "Не указан"}
            </Typography.Text>
          </Col>
          <Col span={2}>
            {record?.id ? (
              <MyShowButton
                hideText
                title="Подробнее"
                size="large"
                resource="companies"
                recordItemId={record.id}
                icon
              />
            ) : (
              <></>
            )}
          </Col>
        </Row>
      </Card>

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
                {ecologist?.email ? ecologist.email : "Не указана"}
              </Typography.Text>
            </Col>
            <Col span={6}>
              <Typography.Title level={5}>Телефон</Typography.Title>
              <Typography.Text>
                {ecologist?.phone ? ecologist.phone : "Не указан"}
              </Typography.Text>
            </Col>

            <Col span={2}>
              {ecologist?.id ? (
                <MyShowButton
                  hideText
                  title="Просмотреть"
                  size="large"
                  resourceNameOrRouteName="users"
                  recordItemId={ecologist.id}
                  icon
                />
              ) : (
                <></>
              )}
            </Col>
          </Row>
        </Card>
      )}
    </Show>
  );
};

export default ContractShow;
