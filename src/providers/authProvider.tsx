import { AuthProvider } from "@pankod/refine-core";
import axios from "axios";
import { axiosInstance, cookies } from "./config";

const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const user = await axios.post(
      "http://localhost:5000/api/auth/staff/login",
      { email, password },
      {
        withCredentials: true,
      }
    );

    console.log(user);

    if (user.statusText === "OK") {
      localStorage.setItem("username", user.data.access_token);
      axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
        const token = `Bearer ${user.data.access_token}`;

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

      // localStorage.setItem("username", user.data.access_token);
      console.log("OK");

      return Promise.resolve();
    }

    return Promise.reject();
  },
  checkAuth: async () => {
    // return Promise.resolve();
    const checkCook = cookies.get("allw");
    console.log(checkCook);

    const user = localStorage.getItem("username");
    if (user) {
      return Promise.resolve();
    }
    return Promise.reject("/login");
  },
  logout: () => {
    localStorage.removeItem("username");
    return Promise.resolve();
  },
  checkError: (error) => {
    if (error.status === 401 || error.status === 403) {
      return Promise.reject();
    }

    return Promise.resolve();
  },
};

export default authProvider;
