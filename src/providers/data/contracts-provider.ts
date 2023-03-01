import { DataProvider, HttpError } from "@pankod/refine-core";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import restDataProvider from "@pankod/refine-simple-rest";
import { axiosInstance } from "../config";

export const contractsDataProvider = (apiUrl: string): DataProvider => ({
  ...restDataProvider(apiUrl),
  getList: async ({
    resource,
    hasPagination,
    filters,
    pagination,
    metaData,
  }) => {
    const url = `${resource}`;
    let paramFilter;

    if (filters) {
      paramFilter = Object.fromEntries(
        //@ts-ignore
        filters.map((item) => [item.field, item.value])
      );
    }

    const { data, headers } = await axiosInstance.get(url, {
      params: {
        perPage: pagination?.pageSize,
        page: pagination?.current,
        ...paramFilter,
      },
    });

    return { data: data.data, total: data.total };
  },
  getOne: async ({ resource, id }) => {
    const url = `${resource}/${id}`;

    const { data } = await axiosInstance.get(url);

    return { data };
  },
  update: async ({ resource, id, variables }) => {
    console.log(id);

    const url = `${resource}/${id}`;

    const { data } = await axiosInstance.patch(url, variables);

    return { data };
  },
  deleteOne: async ({ resource, id }) => {
    const url = `${resource}/${id}`;

    const { data } = await axiosInstance.delete(url);

    return { data };
  },
});
