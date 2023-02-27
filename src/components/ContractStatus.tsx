import { Tag } from "@pankod/refine-antd";
import { ContractStatus } from "../interfaces";

interface ContractStatusProps {
  status: ContractStatus;
}

export const ContractStatusTag: React.FC<ContractStatusProps> = ({
  status,
}) => {
  let color, text;

  switch (status) {
    case "IN_WORK":
      color = "#1677ff";
      text = "В работе";
      break;
    case "COMPLETED":
      color = "#52c41a";
      text = "Завершен";
      break;
    case "PREPARATION":
      color = "#faad14";
      text = "Подготовка";
      break;
  }

  return (
    <Tag title={text} color={color}>
      {text}
    </Tag>
  );
};
