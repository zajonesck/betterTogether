import axios from "axios";

const apiClient = axios.create({});

import { isTokenExpired } from "./src/authHelper";

apiClient.interceptors.request.use(
  (config) => {
    const jwtToken = sessionStorage.getItem("jwt");

    if (!jwtToken) {
      window.location.href = "/login";
      return Promise.reject(new Error("No token found, redirecting to login"));
    }

    if (isTokenExpired(jwtToken)) {
      sessionStorage.removeItem("jwt");
      window.location.href = "/login";
      return Promise.reject(new Error("Token expired, redirecting to login"));
    }

    config.headers["Authorization"] = `Bearer ${jwtToken}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
