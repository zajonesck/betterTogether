import axios from "axios";

const apiClient = axios.create({});

import { isTokenExpired } from "./src/authHelper";

apiClient.interceptors.request.use(
  (config) => {
    const jwtToken = sessionStorage.getItem("jwt");

    if (jwtToken && isTokenExpired(jwtToken)) {
      sessionStorage.removeItem("jwt");
      window.location.href = "/path-to-login";
      return;
    }

    if (jwtToken) {
      config.headers["Authorization"] = `Bearer ${jwtToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
