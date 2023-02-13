import { DataProvider, HttpError } from "@pankod/refine-core";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import restDataProvider from "@pankod/refine-simple-rest";
import { API_URL, axiosInstance } from "../config";

export const applicationsDataProvider = (apiUrl: string): DataProvider => ({
  ...restDataProvider(apiUrl),
  getList: async ({
    resource,
    hasPagination,
    filters,
    pagination,
    metaData,
  }) => {
    const url = `${API_URL}${resource}`;
    console.log(filters);

    const { data, headers } = await axiosInstance.get(url, {
      params: { perPage: pagination?.pageSize },
    });

    return { data: data.data, total: data.total };
  },
  getOne: async ({ resource, id }) => {
    const url = `${API_URL}${resource}/${id}`;

    const { data } = await axiosInstance.get(url);

    return { data };
  },
  update: async ({ resource, id, variables }) => {
    console.log(id);

    const url = `${API_URL}${resource}/${id}`;

    const { data } = await axiosInstance.patch(url, variables);

    return { data };
  },
  deleteOne: async ({ resource, id }) => {
    const url = `${API_URL}${resource}/${id}`;

    const { data } = await axiosInstance.delete(url);

    return { data };
  },
});