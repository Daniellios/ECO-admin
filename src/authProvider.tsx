import { AuthProvider } from "@pankod/refine-core";
import axios from "axios";

const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const user = await axios.post(
      "http://localhost:5000/api/auth/staff/login",
      {
        email: email,
        password: password,
      }
    );

    if (user) {
      return Promise.resolve("/users");
    }

    return Promise.reject();
  },
  checkAuth: () => {
    const user = localStorage.getItem("auth");

    if (user) {
      return Promise.resolve();
    }

    return Promise.reject();
  },
  logout: () => Promise.resolve(),
  checkError: () => Promise.resolve(),
};

export default authProvider;
