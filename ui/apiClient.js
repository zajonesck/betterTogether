import axios from "axios";

// Create an axios instance
const apiClient = axios.create({
  // baseURL: "https://http://localhost:3000/",
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const jwtToken = sessionStorage.getItem("jwt"); // Retrieve JWT from sessionStorage
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
