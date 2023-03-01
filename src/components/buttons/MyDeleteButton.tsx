import { DeleteButton, DeleteButtonProps, Tooltip } from "@pankod/refine-antd";
import { useNavigate } from "@pankod/refine-react-router-v6";

const MyDeleteButton: React.FC<DeleteButtonProps> = ({
  title,
  resourceNameOrRouteName,
  recordItemId,
  ...props
}) => {
  const navigate = useNavigate();

  return (
    <Tooltip title={title ? title : "Удалить"} mouseLeaveDelay={0}>
      <DeleteButton
        resource={props.resource}
        resourceNameOrRouteName={
          resourceNameOrRouteName ? resourceNameOrRouteName : undefined
        }
        confirmOkText="Удалить"
        recordItemId={recordItemId}
        confirmCancelText="Отмена"
        confirmTitle="Вы уверены?"
        onSuccess={() => {
          navigate(`/${props.resource}`);
        }}
        {...props}
      >
        {title ? title : "Удалить"}
      </DeleteButton>
    </Tooltip>
  );
};

export default MyDeleteButton;
