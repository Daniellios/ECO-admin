import { HttpError } from "@pankod/refine-core";
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import Cookies from "universal-cookie";

export const API_URL = "http://localhost:5000/api/";

export const axiosInstance = axios.create({
  baseURL: API_URL,
});
export const cookies = new Cookies();
// axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
//   const token =
//     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjYsInJvbGVzIjoiQURNSU4iLCJpc0VtYWlsQ29uZmlybWVkIjp0cnVlLCJpYXQiOjE2NzY3OTU4MzUsImV4cCI6MTY3Njg4MjIzNX0.fO-Suk7WEASbXGE7qi4FFFasVuUtzbrDDeU7T9YpYM0";
//   if (token) {
//     if (request.headers) {
//       request.headers["Authorization"] = `${token}`;
//     } else {
//       request.headers = {
//         Authorization: `${token}`,
//       };
//     }
//   }
//   return request;
// });

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
