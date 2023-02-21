import { EditButton, EditButtonProps, Tooltip } from "@pankod/refine-antd";

const MyEditButton: React.FC<EditButtonProps> = ({ ...props }) => {
  return (
    <Tooltip title={props.title}>
      <EditButton resource={props.resource} {...props}>
        {props.title ? props.title : "Редактировать"}
      </EditButton>
    </Tooltip>
  );
};

export default MyEditButton;
