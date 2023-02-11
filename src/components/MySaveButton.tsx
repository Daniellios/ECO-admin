import { SaveButton } from "@pankod/refine-antd";

const MySaveButton = () => {
  return (
    <SaveButton resource="users" style={{ background: "#52c41a" }}>
      Сохранить
    </SaveButton>
  );
};

export default MySaveButton;
