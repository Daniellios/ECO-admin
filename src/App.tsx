import { Refine } from "@pankod/refine-core";
import {
  notificationProvider,
  Layout,
  ErrorComponent,
} from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6";
import "@pankod/refine-antd/dist/reset.css";

import { UsersList, UserCreate, UserEdit, UserShow } from "./pages/Users";
import { usersDataProvider } from "./providers/users-provider";
import authProvider from "./authProvider";

import { BookOutlined, UserOutlined } from "@ant-design/icons";
import { ApplicationsList } from "./pages/Applications";
import { API_URL } from "./providers/config";
import { applicationsDataProvider } from "./providers/applications-provider";

const App: React.FC = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      // authProvider={authProvider}
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
          //   create: UserCreate,
          edit: UserEdit,
          show: UserShow,
          canDelete: true,
          icon: <UserOutlined />,
        },
        {
          name: "applications",
          options: { label: "Заявки", dataProviderName: "applications" },
          list: ApplicationsList,
          icon: <BookOutlined />,
        },
      ]}
    />
  );
};

export default App;
