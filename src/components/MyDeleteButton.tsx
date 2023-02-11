import { DeleteButton } from "@pankod/refine-antd";
import { useNavigate } from "@pankod/refine-react-router-v6";

const MyDeleteButton = () => {
  const navigate = useNavigate();
  return (
    <DeleteButton
      resource="users"
      confirmOkText="Удалить"
      confirmCancelText="Отмена"
      confirmTitle="Вы уверены?"
      successNotification={{
        message: "Пользователь был успешно удален",
        type: "success",
      }}
      errorNotification={{
        message: "Ошибка при удалении пользователя",
        type: "error",
      }}
      onSuccess={() => {
        navigate("/users");
      }}
    >
      Удалить
    </DeleteButton>
  );
};

export default MyDeleteButton;
