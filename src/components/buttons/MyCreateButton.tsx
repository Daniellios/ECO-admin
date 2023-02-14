import { CreateButtonProps, CreateButton } from "@pankod/refine-antd";

const MyCreateButton: React.FC<CreateButtonProps> = ({ ...props }) => {
  return (
    <CreateButton resource={props.name} {...props}>
      {props.title || "Создать"}
    </CreateButton>
  );
};

export default MyCreateButton;
