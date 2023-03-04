import { Refine } from "@pankod/refine-core";
import {
  notificationProvider,
  Layout,
  ErrorComponent,
  ConfigProvider,
} from "@pankod/refine-antd";
import routerProvider, {
  BrowserRouterComponent,
} from "@pankod/refine-react-router-v6";
import "@pankod/refine-antd/dist/reset.css";

import { UsersList, UserCreate, UserEdit, UserShow } from "./pages/users";
import { usersDataProvider } from "./providers/data/users-provider";
import authProvider from "./providers/authProvider";

import {
  AuditOutlined,
  BankOutlined,
  BookOutlined,
  CrownOutlined,
  InboxOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ApplicationsList } from "./pages/applications";
import { API_URL } from "./providers/config";
import { applicationsDataProvider } from "./providers/data/applications-provider";
import { LoginPage } from "./pages/auth/loginPage";
import CustomSider from "./components/CustomSider";
import { StaffCreate, StaffList, StaffShow } from "./pages/staff";
import { contractsDataProvider } from "./providers/data/contracts-provider";

import locale from "antd/locale/ru_RU";
import { ContractsList, ContractShow, ContractCreate } from "./pages/contracts";

import "./styles/header.css";
import CustomTitle from "./components/shared/CustomTitle";
import { CompaniesList } from "./pages/companies";

const App: React.FC = () => {
  return (
    <ConfigProvider locale={locale}>
      <Refine
        Title={({ collapsed }) => <CustomTitle collapsed={collapsed} />}
        routerProvider={{
          ...routerProvider,
          RouterComponent: BrowserRouterComponent.bind({
            initialRoute: "/users",
          }),
        }}
        Sider={CustomSider}
        authProvider={authProvider}
        LoginPage={LoginPage}
        dataProvider={{
          default: usersDataProvider(API_URL),
          applications: applicationsDataProvider(API_URL),
          contracts: contractsDataProvider(API_URL),
        }}
        notificationProvider={notificationProvider}
        Layout={Layout}
        catchAll={<ErrorComponent />}
        resources={[
          {
            name: "users",
            options: { label: "Экологи" },
            list: UsersList,
            create: UserCreate,
            edit: UserEdit,
            show: UserShow,
            canDelete: true,
            icon: <UserOutlined />,
          },
          {
            name: "contracts",
            options: { label: "Заказы" },
            list: ContractsList,
            show: ContractShow,
            create: ContractCreate,
            icon: <AuditOutlined />,
          },
          {
            name: "companies",
            options: { label: "Организации" },
            list: CompaniesList,
            icon: <BankOutlined />,
          },
          {
            name: "applications",
            options: { label: "Заявки" },
            list: ApplicationsList,
            icon: <BookOutlined />,
          },
          {
            name: "cmp",
            options: { label: "Сотрудники" },
            list: StaffList,
            create: StaffCreate,
            show: StaffShow,
            canDelete: true,
            icon: <CrownOutlined />,
          },
        ]}
      />
    </ConfigProvider>
  );
};

export default App;
