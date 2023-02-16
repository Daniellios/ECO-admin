import React from "react";
import {
  useBreadcrumb,
  useRouterContext,
  useTranslate,
} from "@pankod/refine-core";
import { RefineBreadcrumbProps } from "@pankod/refine-ui-types";

import {
  Breadcrumb as AntdBreadcrumb,
  BreadcrumbProps as AntdBreadcrumbProps,
} from "antd";

export type BreadcrumbProps = RefineBreadcrumbProps<AntdBreadcrumbProps>;

const CustomBreadCrumb: React.FC<BreadcrumbProps> = ({
  breadcrumbProps,
  hideIcons = false,
}) => {
  const { breadcrumbs } = useBreadcrumb();
  const { Link } = useRouterContext();

  return (
    <AntdBreadcrumb {...breadcrumbProps}>
      <AntdBreadcrumb.Item></AntdBreadcrumb.Item>
      {breadcrumbs.map(({ label, icon, href }) => {
        return (
          <AntdBreadcrumb.Item key={label}>
            {!hideIcons && icon}
            {href ? <Link to={href}> {label}</Link> : <span>{label}</span>}
          </AntdBreadcrumb.Item>
        );
      })}
    </AntdBreadcrumb>
  );
};

export default CustomBreadCrumb;
