import { EditButton, EditButtonProps, Tooltip } from "@pankod/refine-antd";

const MyEditButton: React.FC<EditButtonProps> = ({ ...props }) => {
  return (
    <Tooltip title="Изменить">
      <EditButton resource={props.resource} {...props}>
        Изменить
      </EditButton>
    </Tooltip>
  );
};

export default MyEditButton;
