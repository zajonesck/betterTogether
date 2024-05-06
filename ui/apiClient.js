import axios from "axios";
import { getToken, isTokenExpired } from "./src/authHelper";

const apiClient = axios.create({});

apiClient.interceptors.request.use(
  async (config) => {
    const jwtToken = await getToken();

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
