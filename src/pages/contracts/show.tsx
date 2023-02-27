import {
  Card,
  Col,
  Collapse,
  Divider,
  Row,
  Show,
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

  const contractStatus = record?.status;

  const isAdmin = identity?.roles === "ADMIN";

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
          <Col>
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
          <Typography.Title level={3}>Кандидаты </Typography.Title>
        </Card>
      )}

      <Card>
        <Typography.Title level={3}>Заказчик </Typography.Title>
      </Card>

      {contractStatus === "IN_WORK" && (
        <Card>
          <Typography.Title level={3}>Исполнитель </Typography.Title>
        </Card>
      )}
    </Show>
  );
};

export default ContractShow;
