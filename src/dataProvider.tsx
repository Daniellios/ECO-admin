import { DataProvider, HttpError } from "@pankod/refine-core";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import restDataProvider from "@pankod/refine-simple-rest";

const API_URL = "http://localhost:5000/api/";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE1OSwicm9sZXMiOiJNQU5BR0VSIiwiaXNFbWFpbENvbmZpcm1lZCI6dHJ1ZSwiaWF0IjoxNjc2MDEwNjYwLCJleHAiOjE2NzYwOTcwNjB9.4WGfX3q6KmgqAssmjnsJ13I91mVN9XtqwZGu-N1QtAI";
  if (token) {
    if (request.headers) {
      request.headers["Authorization"] = `${token}`;
    } else {
      request.headers = {
        Authorization: `${token}`,
      };
    }
  }
  return request;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const customError: HttpError = {
      ...error,
      message: error.response?.data?.message,
      statusCode: error.response?.status,
    };

    return Promise.reject(customError);
  }
);

export const myDataProvider = (apiUrl: string): DataProvider => ({
  ...restDataProvider(apiUrl),
  getList: async ({ resource, hasPagination }) => {
    const url = `${API_URL}${resource}`;

    const { data, headers } = await axiosInstance.get(url);
    const total = +headers["x-total-count"];

    return { data, total };
  },
  getOne: async ({ resource, id }) => {
    const url = `${API_URL}${resource}/${id}`;

    const { data } = await axiosInstance.get(url);

    return { data };
  },
});
