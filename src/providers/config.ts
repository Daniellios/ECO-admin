import { HttpError } from "@pankod/refine-core";
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import inMemoryJWT from "./inMemoryJWT";

export const API_URL = "http://localhost:5000/api/";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = inMemoryJWT.getToken();

  if (token) {
    if (request.headers) {
      request.headers["Authorization"] = `Bearer ${token}`;
    } else {
      request.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    return request;
  } else {
    // console.log("ACI CONFIG");
    // inMemoryJWT.setRefreshTokenEndpoint("refresh");
    // return inMemoryJWT.getRefreshedToken().then((gotFreshToken) => {
    //   console.log("GOT REFRESH TOKEN", gotFreshToken);
    //   if (gotFreshToken) {
    //     if (request.headers) {
    //       request.headers["Authorization"] = `Bearer ${inMemoryJWT.getToken()}`;
    //     } else {
    //       request.headers = {
    //         Authorization: `Bearer ${inMemoryJWT.getToken()}`,
    //       };
    //     }
    //   }
    //   return request;
    // });
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
