import { HttpError } from "@pankod/refine-core";
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

export const API_URL = "http://localhost:5000/api/";

export const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjYsInJvbGVzIjoiTUFOQUdFUiIsImlzRW1haWxDb25maXJtZWQiOnRydWUsImlhdCI6MTY3NjM1MjU2MCwiZXhwIjoxNjc2NDM4OTYwfQ.1ZiMX9iP-ITUJgn_EVjQ_WVlbnwiLiWTHmF4Juy9m6E";
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
