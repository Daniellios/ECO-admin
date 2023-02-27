import { Show } from "@pankod/refine-antd";
import {
  IResourceComponentsProps,
  usePermissions,
  useResource,
  useShow,
} from "@pankod/refine-core";
import MyDeleteButton from "../../components/buttons/MyDeleteButton";
import MyRefreshButton from "../../components/buttons/MyRefreshButton";
import { IContract } from "../../interfaces";

const ContractShow: React.FC<IResourceComponentsProps> = () => {
  const { resource } = useResource({
    resourceNameOrRouteName: "contracts",
  });

  const { data: identity, isFetched } = usePermissions({});

  const { queryResult } = useShow<IContract>({});
  const { data, isLoading } = queryResult;
  const record = data?.data;

  const isAdmin = identity?.roles === "ADMIN";

  return (
    <Show
      isLoading={isLoading}
      canEdit={true}
      canDelete={isAdmin}
      title="Просмотр"
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
    ></Show>
  );
};

export default ContractShow;
