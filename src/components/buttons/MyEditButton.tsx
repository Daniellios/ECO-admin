import { EditButton, EditButtonProps, Tooltip } from "@pankod/refine-antd";

const MyEditButton: React.FC<EditButtonProps> = ({
  title,
  resourceNameOrRouteName,
  recordItemId,
  ...props
}) => {
  return (
    <Tooltip title={title ? title : "Редактировать"}>
      <EditButton
        resource={props.resource}
        resourceNameOrRouteName={
          resourceNameOrRouteName ? resourceNameOrRouteName : undefined
        }
        recordItemId={recordItemId}
        {...props}
      >
        {title ? title : "Редактировать"}
      </EditButton>
    </Tooltip>
  );
};

export default MyEditButton;
