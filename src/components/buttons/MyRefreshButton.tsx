import { RefreshButton, RefreshButtonProps } from "@pankod/refine-antd";

const MyRefreshButton: React.FC<RefreshButtonProps> = ({ ...props }) => {
  return (
    <RefreshButton resource={props.name} {...props}>
      {props.title || "Обновить"}
    </RefreshButton>
  );
};

export default MyRefreshButton;
