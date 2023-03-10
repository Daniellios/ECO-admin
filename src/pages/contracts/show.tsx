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
        message: `???????????? ?????????????? ???????????????? ???? ?????????? ${record?.id}`,
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
        message: `???????????? ?????? ???????? ?? ???????????? ${record?.id}`,
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
      title={<PageTitle title="??????????" id={record?.id} />}
      headerButtons={
        <>
          <MyDeleteButton
            resource={resource.name}
            successNotification={{
              message: `??????????  ${record?.id} ?????? ?????????????? ???????????? `,
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
          <Typography.Title level={3}>?????????? ???????????????????? </Typography.Title>
          <ContractStatusTag status={record?.status}></ContractStatusTag>
        </Row>

        <Divider></Divider>

        <Row>
          <Col span={22}>
            <Typography.Title level={5}>????????????????</Typography.Title>
            <Typography.Text>{record?.description || "??????"}</Typography.Text>
          </Col>
        </Row>
        <Divider></Divider>

        <Row>
          <Col span={6}>
            <Typography.Title level={5}>??????????????????</Typography.Title>
            <DateCell value={record?.updatedAt}></DateCell>
          </Col>

          <Col span={6}>
            <Typography.Title level={5}>??????????????</Typography.Title>
            <DateCell value={record?.createdAt}></DateCell>
          </Col>

          <Col span={6}>
            <Typography.Title level={5}>???????????? ??????????</Typography.Title>
            <DateCell value={record?.startAt}></DateCell>
          </Col>

          <Col span={6}>
            <Typography.Title level={5}>?????????? ??????????</Typography.Title>
            <DateCell value={record?.endAt}></DateCell>
          </Col>
        </Row>
        {/* 
        <Form {...formProps} layout="vertical">
      
       
              <DatePickerField
                fromItemProps={{ name: "startAt" }}
                datePickerProps={{ placeholder: "???????? ????????????" }}
              ></DatePickerField>
          
            <DatePickerField
            fromItemProps={{ name: "endAt" }}
            datePickerProps={{ placeholder: "???????? ??????????" }}
          ></DatePickerField>


          <CyrilicTextField
            isTextArea
            fromItemProps={{ name: "description" }}
            inputProps={{ placeholder: "????????????????" }}
          ></CyrilicTextField>
          <PositiveNumberField
            fromItemProps={{
              label: "?????????? ??????????",
              name: "totalPrice",
              initialValue: null,
            }}
            inputProps={{
              placeholder: "??????????",
            }}
          ></PositiveNumberField>
        </Form> */}

        <Divider></Divider>
        <Row>
          <Col span={6}>
            <Typography.Title level={5}>??????????</Typography.Title>
            <Typography.Text> {record?.totalPrice}</Typography.Text>
          </Col>
          <Col span={6}>
            <Typography.Title level={5}>?????????? ???????????? ??????????????</Typography.Title>
            <Typography.Text> {record?.paymentAmount}</Typography.Text>
          </Col>
        </Row>
      </Card>

      <ContractJobsTable contractId={record?.id}></ContractJobsTable>

      {contractStatus !== "IN_WORK" && contractStatus !== "COMPLETED" && (
        <Card>
          <>
            <Typography.Title level={3}>??????????????????</Typography.Title>
            {candidates && candidates?.length > 0 && (
              <Row align={"middle"} justify="space-between">
                <Col span={6}>
                  <Typography.Title level={5}>??.??.??</Typography.Title>
                </Col>
                <Col span={6}>
                  <Typography.Title level={5}>??????????????</Typography.Title>
                </Col>
                <Col span={6}>
                  <Typography.Title level={5}>??????????</Typography.Title>
                </Col>
                <Col span={6}>
                  <Typography.Title level={5}>????????????????</Typography.Title>
                </Col>
              </Row>
            )}

            {candidates && candidates?.length < 1 && (
              <Typography.Title level={4} className="sub_text">
                ???????????????????? ???? ???????????????????? ???????????? ???????? ??????
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
                        {ecologist.phone || "???? ????????????"}
                      </Typography.Text>
                    </Col>
                    <Col span={6}>
                      <Typography.Text>{ecologist?.email}</Typography.Text>
                    </Col>
                    <Col span={6}>
                      <Space>
                        <MyShowButton
                          hideText
                          title="?????????????? ?? ??????????????"
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
                          title="?????????????????? ???? ??????????"
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
          <Typography.Title level={3}>????????????????</Typography.Title>

          <Row align={"middle"}>
            <Col span={6}>
              <Typography.Title level={5}>????????????????????????</Typography.Title>
              <Typography.Text>
                {company.companyName || "???? ??????????????"}
              </Typography.Text>
            </Col>
            <Col span={4}>
              <Typography.Title level={5}>??????????</Typography.Title>
              <Typography.Text>
                {company.companySphere || "???? ??????????????"}
              </Typography.Text>
            </Col>
            <Col span={6}>
              <Typography.Title level={5}>??????????</Typography.Title>
              <Typography.Text>{company.email || "???? ??????????????"}</Typography.Text>
            </Col>
            <Col span={6}>
              <Typography.Title level={5}>??????????????</Typography.Title>
              <Typography.Text>{company.phone || "???? ????????????"}</Typography.Text>
            </Col>
            <Col span={2}>
              {record?.id && (
                <MyShowButton
                  hideText
                  title="?????????????? ?? ????????????????"
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
          <Typography.Title level={3}>?????????????????????? </Typography.Title>
          <Row align="middle">
            <Col span={10}>
              <Typography.Title level={5}>??.??.??</Typography.Title>
              <Typography.Text>
                {ecologist?.firstName
                  ? `${ecologist.firstName} ${ecologist.secondName} ${ecologist.thirdName}`
                  : "???? ????????????"}
              </Typography.Text>
            </Col>
            <Col span={6}>
              <Typography.Title level={5}>??????????</Typography.Title>
              <Typography.Text>
                {ecologist?.email || "???? ??????????????"}
              </Typography.Text>
            </Col>
            <Col span={6}>
              <Typography.Title level={5}>??????????????</Typography.Title>
              <Typography.Text>
                {ecologist?.phone || "???? ????????????"}
              </Typography.Text>
            </Col>
            {ecologist?.id && (
              <Col span={2}>
                <MyShowButton
                  hideText
                  title="?????????????? ?? ??????????????"
                  size="large"
                  resourceNameOrRouteName="users"
                  recordItemId={ecologist.id}
                  icon
                />
                <MyEditButton
                  hideText
                  onClick={removeEcologistFromContract}
                  title="?????????? ?? ????????????"
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
