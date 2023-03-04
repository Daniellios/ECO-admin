import { Tag } from "@pankod/refine-antd";
import { UserStatus } from "../..";

interface UserStatusProps {
  status: UserStatus;
}

export const UserStatusTag: React.FC<UserStatusProps> = ({ status }) => {
  let color, text;

  switch (status) {
    case "BANNED":
      color = "rgb(255, 77, 79)";
      text = "Забанен";
      break;
    case "CONFIRMED":
      color = "#52c41a";
      text = "Подтвержден";
      break;
    case "IN_CHECK":
      color = "#faad14";
      text = "В проверке";
      break;
  }

  return (
    <Tag title={text} color={color}>
      {text}
    </Tag>
  );
};
