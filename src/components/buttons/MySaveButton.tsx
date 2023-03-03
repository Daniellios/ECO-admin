import { SaveButton, SaveButtonProps } from "@pankod/refine-antd";

const MySaveButton: React.FC<SaveButtonProps> = ({ ...props }) => {
  console.log(props.resource);

  return (
    <SaveButton resource={props.resource} {...props}>
      {props.title || "Сохранить"}
    </SaveButton>
  );
};

export default MySaveButton;
