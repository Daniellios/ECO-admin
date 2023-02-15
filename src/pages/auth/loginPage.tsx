import { useLogin } from "@pankod/refine-core";
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Typography,
} from "@pankod/refine-antd";
const { Title } = Typography;
import "../../styles/main.css";

type LoginVariables = {
  email: string;
  password: string;
};

export const LoginPage = () => {
  const { mutate: login, isLoading } = useLogin<LoginVariables>();

  const [form] = Form.useForm<LoginVariables>();

  const onLoginSubmit = (values: LoginVariables) => {
    login(values);
  };

  const CardTitle = (
    <Title level={3} style={{ textAlign: "center" }}>
      Вход в аккаунт
    </Title>
  );

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        height: "100vh",
      }}
    >
      <Col xs={6}>
        <Card title={CardTitle} headStyle={{ borderBottom: 0 }}>
          <Form
            layout="vertical"
            autoComplete="off"
            form={form}
            onFinish={(values) => {
              login(values);
            }}
            requiredMark={false}
            initialValues={onLoginSubmit}
          >
            <Form.Item name="email" label="Почта" rules={[{ required: true }]}>
              <Input size="large" placeholder="email" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Пароль"
              rules={[{ required: true, message: "Пароль обязателен" }]}
            >
              <Input type="password" placeholder="●●●●●●●●" size="large" />
            </Form.Item>

            <Divider></Divider>
            <Button
              size="large"
              htmlType="submit"
              block
              className="greenBg"
              disabled={isLoading}
            >
              Войти
            </Button>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};
