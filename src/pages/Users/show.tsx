import { useShow, IResourceComponentsProps, useOne } from "@pankod/refine-core";

import {
  Show,
  Typography,
  MarkdownField,
  Breadcrumb,
} from "@pankod/refine-antd";

import { IUser } from "../../interfaces";

const { Title, Text } = Typography;

export const UserShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<IUser>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  const { data: categoryData, isLoading: categoryIsLoading } = useOne<IUser>({
    resource: "users",
    id: 147,
  });

  return (
    <Show isLoading={isLoading} title={"Эколог"}>
      <Title level={5}>Id</Title>
      <Text>{record?.id}</Text>

      <Title level={5}>Имя</Title>
      <Text>{record?.firstName}</Text>

      <Title level={5}>Почта</Title>
      <Text>{record?.email}</Text>
    </Show>
  );
};
