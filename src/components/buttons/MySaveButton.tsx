import { SaveButton, SaveButtonProps } from "@pankod/refine-antd";

const MySaveButton: React.FC<SaveButtonProps> = ({ ...props }) => {
  return (
    <SaveButton resource="users" style={{ background: "#52c41a" }} {...props}>
      Сохранить
    </SaveButton>
  );
};

export default MySaveButton;
