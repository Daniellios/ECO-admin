import { Button, Divider, Form, Row, Space } from "@pankod/refine-antd";
import { FormProps } from "antd/lib/form/Form";
import React from "react";
import MySaveButton from "../buttons/MySaveButton";

interface ITableFilterForm {
  formTitle: string;
  formProps: FormProps;
  children: React.ReactNode;
}

const TableFilterForm: React.FC<ITableFilterForm> = ({
  children,
  ...props
}) => {
  const handleFormClear = () => {
    console.log("Call form cleaner");
    props.formProps.form?.resetFields();
    props.formProps.form?.submit();
  };

  const handleFilterFormSubmit = () => {
    console.log("Call form submit");
    const values = props.formProps.form?.getFieldsValue();
    console.log(values);

    props.formProps.form?.submit();
  };

  return (
    <>
      <h3>{props.formTitle}</h3>
      <Row>
        <Form
          {...props.formProps}
          layout="inline"
          autoComplete="on"
          size="middle"
        >
          {children}

          <Space>
            <MySaveButton
              onClick={handleFilterFormSubmit}
              icon={null}
              title="Применить"
            />
            <Button onClick={handleFormClear}>Очистить фильтр </Button>
          </Space>
        </Form>
      </Row>
      <Divider></Divider>
    </>
  );
};

export default TableFilterForm;
