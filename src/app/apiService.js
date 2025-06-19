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

// Image Upload APIs
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  return apiService.post("/images/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const uploadMultipleImages = async (files) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("images", file);
  });

  return apiService.post("/images/upload-multiple", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const updateProductWithImage = async (
  productId,
  productData,
  imageFile = null
) => {
  const formData = new FormData();

  // Append product data
  Object.keys(productData).forEach((key) => {
    if (productData[key] !== null && productData[key] !== undefined) {
      formData.append(key, productData[key]);
    }
  });

  // Append image if provided
  if (imageFile) {
    formData.append("image", imageFile);
  }

  return apiService.put(`/products/${productId}/image`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteImage = async (publicId) => {
  return apiService.delete(`/images/delete/${publicId}`);
};

// Export new functions
export {
  uploadImage,
  uploadMultipleImages,
  updateProductWithImage,
  deleteImage,
};

export default apiService;
