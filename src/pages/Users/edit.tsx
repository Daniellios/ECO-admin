import React from "react";
import {
  HttpError,
  IResourceComponentsProps,
  usePermissions,
  useResource,
} from "@pankod/refine-core";

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

import MyRefreshButton from "../../components/buttons/MyRefreshButton";
import MySaveButton from "../../components/buttons/MySaveButton";
import MyDeleteButton from "../../components/buttons/MyDeleteButton";
import { IUpdateUser, UserStatus } from "../../interfaces";
import { removeEmptyValues } from "../../helpers/removeEmptyValues";

export const UserEdit: React.FC<IResourceComponentsProps> = () => {
  const {
    formProps,
    saveButtonProps,
    queryResult,
    formLoading,
    form,
    onFinish,
  } = useForm<IUpdateUser, HttpError>({
    warnWhenUnsavedChanges: false,
  });
  const { data: identity, isFetched } = usePermissions({});

  const { resource } = useResource({
    resourceNameOrRouteName: "users",
  });

  const userData = queryResult?.data?.data;
  // const { selectProps: categorySelectProps } = useSelect<ICategory>({
  //     resource: "categories",
  //     defaultValue: postData?.category.id,
  // });
  const isAdmin = identity?.roles === "ADMIN";

  const onHandleSubmit = () => {
    const values = form.getFieldsValue();
    const updated = removeEmptyValues(values);
    onFinish(updated);
  };

  return (
    <Edit
      title={"Редактирование"}
      isLoading={formLoading}
      footerButtons={() => (
        <>
          {isAdmin && (
            <MyDeleteButton resource={resource.name}></MyDeleteButton>
          )}

          <MySaveButton
            resource={resource.name}
            onClick={onHandleSubmit}
          ></MySaveButton>
        </>
      )}
      headerButtons={() => (
        <>
          <MyRefreshButton></MyRefreshButton>
        </>
      )}
    >
      <Form {...formProps} layout="vertical" size="small">
        <Row align="middle" justify="start">
          <Col span={4}>
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

          <Col span={4} push={1}>
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

          <Col span={4} push={2}>
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
          <Col span={4}>
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

          <Col span={4} push={1}>
            <Form.Item
              label="Статус"
              name="status"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Select
                dropdownMatchSelectWidth={false}
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
      </Form>
    </Edit>
  );
};
