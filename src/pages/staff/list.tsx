import { List, Table } from "@pankod/refine-antd";
import {
  HttpError,
  IResourceComponentsProps,
  useResource,
} from "@pankod/refine-core";
import { IStaffMember } from "../../interfaces";

import { useTable } from "@pankod/refine-antd";

export const StaffList: React.FC<IResourceComponentsProps> = () => {
  const { resource } = useResource({
    resourceNameOrRouteName: "staff",
  });

  const { tableProps } = useTable<IStaffMember, HttpError>({
    syncWithLocation: false,
    initialPageSize: 10,
    resource: resource.name,
  });

  return (
    <List title="Сотрудники">
      <Table {...tableProps}></Table>
    </List>
  );
};
