import { Refine } from "@pankod/refine-core";
import {
  notificationProvider,
  Layout,
  ErrorComponent,
} from "@pankod/refine-antd";
import routerProvider, {
  BrowserRouterComponent,
} from "@pankod/refine-react-router-v6";
import "@pankod/refine-antd/dist/reset.css";

import { UsersList, UserCreate, UserEdit, UserShow } from "./pages/users";
import { usersDataProvider } from "./providers/data/users-provider";
import authProvider from "./providers/authProvider";

import { BookOutlined, CrownOutlined, UserOutlined } from "@ant-design/icons";
import { ApplicationsList } from "./pages/applications";
import { API_URL } from "./providers/config";
import { applicationsDataProvider } from "./providers/data/applications-provider";
import { LoginPage } from "./pages/auth/loginPage";
import CustomSider from "./components/CustomSider";
import { StaffList } from "./pages/staff";
import { StaffCreate } from "./pages/staff/create";
import { StaffShow } from "./pages/staff/show";

const App: React.FC = () => {
  return (
    <Refine
      routerProvider={{
        ...routerProvider,
        RouterComponent: BrowserRouterComponent.bind({
          initialRoute: "/users",
        }),
      }}
      authProvider={authProvider}
      LoginPage={LoginPage}
      dataProvider={{
        default: usersDataProvider(API_URL),
        applications: applicationsDataProvider(API_URL),
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
  );
};

export default App;
