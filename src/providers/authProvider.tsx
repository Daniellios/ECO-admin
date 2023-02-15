import { AuthProvider } from "@pankod/refine-core";
import axios from "axios";

const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const user = await axios.post(
      "http://localhost:5000/api/auth/staff/login",
      {
        email,
        password,
      }
    );

    console.log(user);

    if (user.statusText === "OK") {
      localStorage.setItem("username", user.data.access_token);
      console.log("OK");

      return Promise.resolve();
    }

    return Promise.reject();
  },
  checkAuth: () => {
    // return Promise.resolve();

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
