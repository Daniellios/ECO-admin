import { EyeOutlined } from "@ant-design/icons";
import { ShowButton, ShowButtonProps, Tooltip } from "@pankod/refine-antd";
import React from "react";

const MyShowButton: React.FC<ShowButtonProps> = ({
  recordItemId,
  title,
  hideText,
  size,
  icon,
  resourceNameOrRouteName,
}) => {
  console.log(recordItemId);

  return (
    <Tooltip title={title ? title : "Просмотреть"}>
      <ShowButton
        hideText={hideText}
        size={size}
        resourceNameOrRouteName={
          resourceNameOrRouteName ? resourceNameOrRouteName : undefined
        }
        recordItemId={recordItemId}
        icon={icon ? <EyeOutlined></EyeOutlined> : ""}
      >
        {title}
      </ShowButton>
    </Tooltip>
  );
};

export default MyShowButton;
