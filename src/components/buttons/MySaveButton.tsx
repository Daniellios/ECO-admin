import { SaveButton, SaveButtonProps } from "@pankod/refine-antd";

const MySaveButton: React.FC<SaveButtonProps> = ({ ...props }) => {
  return (
    <SaveButton
      resource={props.name}
      style={{ background: "#52c41a" }}
      {...props}
    >
      {props.title || "Сохранить"}
    </SaveButton>
  );
};

export default MySaveButton;
