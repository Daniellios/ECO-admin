import { axiosInstance } from "./config";

const inMemoryJWTManager = () => {
  let isRefreshing: null | any = null;
  let inMemoryJWT: string | null = null;
  let refreshEndpoint: string = "refresh";
  let logoutEventName: string = "logout";

  let refreshTimeOutId: any;

  const setLogoutEventName = (name: string) => {
    logoutEventName = name;
  };
  const setRefreshTokenEndpoint = (endpoint: string) => {
    refreshEndpoint = endpoint;
  };

  const refreshToken = (delay: number) => {
    console.log("REFRESH TPEKN");

    refreshTimeOutId = window.setTimeout(getRefreshedToken, delay - 5000); // Validity period of the token in seconds, minus 5 seconds
  };

  const abordRefreshToken = () => {
    console.log("ABORD RT");

    if (refreshTimeOutId) {
      window.clearTimeout(refreshTimeOutId);
    }
  };

  const waitForTokenRefresh = () => {
    if (!isRefreshing) {
      return Promise.resolve();
    }
    return isRefreshing.then(() => {
      isRefreshing = null;
      return true;
    });
  };

  const getRefreshedToken = async () => {
    // const delay = 1000 * 15 * 60;

    // axiosInstance
    //   .get(refreshEndpoint)
    //   .then((response) => {
    //     if (response.status !== 200) {
    //       ereaseToken();
    //       console.log("FAILED TO RENEW");
    //       return null;
    //     }
    //     return response.data.access_token;
    //   })
    //   .then((response) => {
    //     console.log(response);

    //     if (response) {
    //       setToken(access_token, delay);
    //       return true;
    //     }
    //     // ereaseToken();
    //     return false;
    //   });

    // // return isRefreshing;

    console.log("GET REFRESH TOKEN");
    const delay = 1000 * 15 * 60;
    const data = await axiosInstance.get(refreshEndpoint);

    console.log("GET REFRESH TOKEN DATA ", data);

    if (data.status !== 200) {
      ereaseToken();
      console.log("Failed to renew the jwt from the refresh token.");
      return null;
    }
    const token = await data.data.access_token;
    console.log(token);

    if (token) {
      setToken(token, delay);
      return true;
    } else {
      ereaseToken();
      return false;
    }
  };

  const getToken = (): string | null => inMemoryJWT;

  const setToken = (token: string, delay: number): boolean => {
    console.log("SET TOKEN");

    inMemoryJWT = token;
    refreshToken(delay);
    return true;
  };

  const ereaseToken = (): boolean => {
    console.log("ERASE TOKEN");

    inMemoryJWT = null;
    abordRefreshToken();
    window.localStorage.setItem(logoutEventName, Date.now().toString());
    return true;
  };

  window.addEventListener("storage", (event) => {
    console.log(event.key);

    if (event.key === logoutEventName) {
      inMemoryJWT = null;
    }
  });

  return {
    ereaseToken,
    getToken,
    setLogoutEventName,
    setRefreshTokenEndpoint,
    getRefreshedToken,
    waitForTokenRefresh,
    setToken,
  };
};

export default inMemoryJWTManager();
