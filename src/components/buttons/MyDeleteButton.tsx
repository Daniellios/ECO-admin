import { DeleteButton, DeleteButtonProps, Tooltip } from "@pankod/refine-antd";
import { useNavigate } from "@pankod/refine-react-router-v6";

const MyDeleteButton: React.FC<DeleteButtonProps> = ({ ...props }) => {
  const navigate = useNavigate();

  return (
    <Tooltip title="Удалить" mouseLeaveDelay={0}>
      <DeleteButton
        resource={props.resource}
        confirmOkText="Удалить"
        confirmCancelText="Отмена"
        confirmTitle="Вы уверены?"
        onSuccess={() => {
          navigate(`/${props.resource}`);
        }}
        {...props}
      >
        Удалить
      </DeleteButton>
    </Tooltip>
  );
};

export default MyDeleteButton;
