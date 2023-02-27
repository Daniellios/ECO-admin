import { AuthProvider } from "@pankod/refine-core";
import { API_URL, axiosInstance } from "./config";
import inMemoryJWT from "./inMemoryJWT";
import jwt_decode from "jwt-decode";
import { IDecodedIdentity, IDecodedJwt } from "..";

const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const user = await axiosInstance.post("/auth/staff/login", {
      email,
      password,
    });
    const delay = 1000 * 15 * 60;
    console.log(inMemoryJWT);

    inMemoryJWT.setRefreshTokenEndpoint(`${API_URL}auth/refresh`);

    if (user.status < 200 || user.status >= 300) {
      throw new Error(user.statusText);
    }

    console.log(user);

    inMemoryJWT.setToken(user.data.access_token, delay);

    console.log("OK");

    return Promise.resolve("/");
  },
  checkAuth: async () => {
    console.log("CHECK AUTH");

    // return Promise.resolve();
    if (!inMemoryJWT.getToken()) {
      inMemoryJWT.setRefreshTokenEndpoint("auth/refresh");
      return inMemoryJWT.getRefreshedToken().then((tokenHasBeenRefreshed) => {
        return tokenHasBeenRefreshed ? Promise.resolve() : Promise.reject();
      });
    } else {
      return Promise.resolve("/");
    }
    // return inMemoryJWT.getToken()
    //   ? await Promise.resolve()
    //   : await Promise.reject();
  },
  logout: async () => {
    await axiosInstance.post("/auth/staff/logout");

    inMemoryJWT.ereaseToken();
    return Promise.resolve("");
  },
  checkError: (error) => {
    console.log(error);

    const status = error.status;
    if (status === 401 || status === 403) {
      inMemoryJWT.ereaseToken();
      return Promise.reject();
    }

    return Promise.resolve();
  },
  getPermissions: async () => {
    console.log("CHECK PERMISSONS");
    const token = inMemoryJWT.getToken();

    if (!token) return Promise.reject();

    const decodedToken: IDecodedJwt = jwt_decode(token, { header: false });
    const userIDentity: IDecodedIdentity = {
      id: decodedToken.sub,
      roles: decodedToken.roles,
    };

    return Promise.resolve(userIDentity);
    // return inMemoryJWT.getToken() ? Promise.resolve() : Promise.reject();
  },
};

export default authProvider;
