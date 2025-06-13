import axios from "axios";
import { BASE_URL } from "./config";

const apiService = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Include cookies with requests
});

apiService.interceptors.request.use(
  (request) => {
    // Attach JWT token if available
    const token = window.localStorage.getItem("token");
    if (token) {
      request.headers["Authorization"] = `Bearer ${token}`;
    }
    console.log(
      "[API REQUEST]",
      request.method?.toUpperCase(),
      request.url,
      request.params || ""
    );
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
    return Promise.reject(error);
  }
);

apiService.interceptors.response.use(
  (response) => {
    console.log("Response", response);
    return response;
  },
  async function (error) {
    console.log("RESPONSE ERROR", error);
    const originalRequest = error.config;
    // Prevent infinite loop: do not refresh for /auth/refresh
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;
      try {
        await refreshAccessToken();
        // Update Authorization header with new token
        const token = window.localStorage.getItem("token");
        if (token) {
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
        }
        return apiService(originalRequest);
      } catch (refreshError) {
        window.localStorage.removeItem("token");
        // Redirect to homepage and show error
        window.location.href = "/";
        setTimeout(() => {
          alert("Your session has expired. Please log in again.");
        }, 100);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// Call /auth/refresh to get a new access token using the refresh token cookie
export async function refreshAccessToken() {
  try {
    const response = await apiService.post("/auth/refresh");
    const { token } = response.data.data;
    if (token) {
      window.localStorage.setItem("token", token);
      return token;
    }
    throw new Error("No token in refresh response");
  } catch (err) {
    window.localStorage.removeItem("token");
    throw err;
  }
}

export default apiService;
