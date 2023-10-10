import axios from "axios";

const apiClient = axios.create({});

apiClient.interceptors.request.use(
  (config) => {
    const jwtToken = sessionStorage.getItem("jwt");
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
