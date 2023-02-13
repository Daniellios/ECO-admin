import { RefreshButton, RefreshButtonProps } from "@pankod/refine-antd";

const MyRefreshButton: React.FC<RefreshButtonProps> = ({ ...props }) => {
  return (
    <RefreshButton resource="users" {...props}>
      Обновить
    </RefreshButton>
  );
};

export default MyRefreshButton;
