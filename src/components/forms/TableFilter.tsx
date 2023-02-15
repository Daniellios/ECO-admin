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

    console.log(props.formProps.form?.getFieldsValue());

    props.formProps.form?.submit();
  };

  return (
    <>
      <Row>
        <h3>{props.formTitle}</h3>
      </Row>
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
