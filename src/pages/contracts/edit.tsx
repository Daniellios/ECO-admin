import {
  Col,
  Divider,
  Edit,
  Form,
  Row,
  Typography,
  useForm,
} from "@pankod/refine-antd";
import {
  IResourceComponentsProps,
  usePermissions,
  useResource,
} from "@pankod/refine-core";
import CyrilicTextField from "../../components/forms/fields/CyrilicTextFIeld";
import DatePickerField from "../../components/forms/fields/DatePickerField";
import PositiveNumberField from "../../components/forms/fields/PositiveNumberField";
import PageTitle from "../../components/shared/PageTitle";

export const ContractEdit: React.FC<IResourceComponentsProps> = () => {
  const { resource } = useResource({
    resourceNameOrRouteName: "contracts",
  });
  const { formProps, form, onFinish, queryResult } = useForm({
    action: "edit",
  });

  const { data: identity, isFetched } = usePermissions({});

  const isAdmin = identity?.roles === "ADMIN";

  return (
    <Edit title={<PageTitle title="Заказ" id={""} />}>
      <Form {...formProps} layout="vertical">
        <Row>
          <Col>
            <DatePickerField
              fromItemProps={{ name: "startAt" }}
              datePickerProps={{ placeholder: "Дата начала" }}
            ></DatePickerField>
          </Col>

          <Col push={1}>
            <DatePickerField
              fromItemProps={{ name: "endAt" }}
              datePickerProps={{ placeholder: "Дата конца" }}
            ></DatePickerField>
          </Col>
        </Row>

        <CyrilicTextField
          isTextArea
          fromItemProps={{ name: "description" }}
          inputProps={{ placeholder: "Описание" }}
        ></CyrilicTextField>

        <Divider></Divider>

        <Typography.Title level={4}>Услуги по заказу</Typography.Title>

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
      </Form>
    </Edit>
  );
};
