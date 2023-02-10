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
          //   edit: UserEdit,
          show: UserShow,
          canDelete: true,
        },
      ]}
    />
  );
};

export default App;
