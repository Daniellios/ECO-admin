import { Refine, useList } from "@pankod/refine-core";
import {
  notificationProvider,
  Layout,
  ErrorComponent,
} from "@pankod/refine-antd";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";
import "@pankod/refine-antd/dist/reset.css";

import { UsersList, UserCreate, UserEdit, UserShow } from "./pages/Users";
import { myDataProvider } from "./dataProvider";
import authProvider from "./authProvider";

import { BookOutlined, UserOutlined } from "@ant-design/icons";
import { ApplicationsList } from "./pages/Applications";

const App: React.FC = () => {
  //   const { data, isLoading, isError } = useList({
  //     dataProviderName: "myDataProvider",
  //     resource: "users",
  //     config: {
  //         pagination: {

  //         }
  //     }
  //   });

  return (
    <Refine
      routerProvider={routerProvider}
      // authProvider={authProvider}
      dataProvider={myDataProvider("http://localhost:5000/api")}
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
          options: { label: "Заявки" },
          list: ApplicationsList,
          icon: <BookOutlined />,
        },
      ]}
    />
  );
};

export default App;
