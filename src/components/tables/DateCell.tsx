import { DateField, DateFieldProps } from "@pankod/refine-antd";
import React from "react";
import dayjs from "dayjs";

const DateCell: React.FC<DateFieldProps> = ({ ...props }) => {
  return (
    <DateField
      defaultValue={"Не указана"}
      locales="RU"
      format="DD/MM/YYYY"
      value={props.value}
    ></DateField>
  );
};

export default DateCell;
