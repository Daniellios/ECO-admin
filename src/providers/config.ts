import { HttpError } from "@pankod/refine-core";
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

export const API_URL = "http://localhost:5000/api/";

export const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjYsInJvbGVzIjoiQURNSU4iLCJpc0VtYWlsQ29uZmlybWVkIjp0cnVlLCJpYXQiOjE2NzY1NTQ5MDQsImV4cCI6MTY3NjY0MTMwNH0.czvNjs4OV4mJqLBj3A1E2TKjlcxrXIFOfxT5EyMaMl0";
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
