import React from "react";
import { IResourceComponentsProps } from "@pankod/refine-core";

import {
  Col,
  Edit,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "@pankod/refine-antd";

import { useForm, useSelect } from "@pankod/refine-antd";

import { IUpdateUser, IUser, UserStatus } from "../../interfaces";
import MyRefreshButton from "../../components/buttons/MyRefreshButton";
import MySaveButton from "../../components/buttons/MySaveButton";
import MyDeleteButton from "../../components/buttons/MyDeleteButton";

export const UserEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult, formLoading } =
    useForm<IUpdateUser>({
      warnWhenUnsavedChanges: true,
    });

  const userData = queryResult?.data?.data;
  // const { selectProps: categorySelectProps } = useSelect<ICategory>({
  //     resource: "categories",
  //     defaultValue: postData?.category.id,
  // });

  return (
    <Edit
      title={"Редактировать"}
      isLoading={formLoading}
      footerButtons={() => (
        <>
          <MyDeleteButton></MyDeleteButton>
          <MySaveButton></MySaveButton>
        </>
      )}
      headerButtons={() => (
        <>
          <MyRefreshButton></MyRefreshButton>
        </>
      )}
    >
      <Form {...formProps} layout="vertical">
        <>
          <Row align="middle" justify="start">
            <Col span={3}>
              <Form.Item
                label="Имя"
                name="firstName"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={3} push={1}>
              <Form.Item
                label="Фамилия"
                name="secondName"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={3} push={2}>
              <Form.Item
                label="Отчество"
                name="thirdName"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row align="middle" justify="start">
            <Col span={3}>
              <Form.Item
                label="Телефон"
                name="phone"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={3} push={1}>
              <Form.Item
                label="Статус"
                name="status"
                rules={[
                  {
                    type: "enum",
                    required: false,
                  },
                ]}
              >
                <Select
                  options={[
                    {
                      label: "Подтвержден",
                      value: "CONFIRMED",
                    },
                    {
                      label: "В проверке",
                      value: "IN_CHECK",
                    },
                    {
                      label: "Забанен",
                      value: "BANNED",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
        </>
      </Form>
    </Edit>
  );
};
