import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://i-stage.mkwms.dev",
  timeout: 5000,
});

// Request Interceptor
apiClient.interceptors.request.use((config) => {
  // const token = localStorage.getItem("token");
  // console.log("token dashboard = ", token);
  // config.headers.Authorization = token ? `Bearer ${token}` : "";
  config.headers.Macaddress = "1CC10CAD27C6";
  return config;
});

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (error.response.status === 401) {
    //   // Redirect to login on 401
    //   window.location.href = "/login";
    // }
    return Promise.reject(error);
  }
);

export default apiClient;