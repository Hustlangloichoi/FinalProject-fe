/**
 * apiService.js: Configures and exports an Axios instance for API requests.
 * Handles JWT authentication, automatic token refresh, and image upload helpers.
 */
import axios from "axios";
import { BASE_URL } from "./config";

/**
 * Configure axios instance with base URL and credentials
 * Automatically send cookies and handle JWT token
 */
const apiService = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

/**
 * Request interceptor: Automatically add JWT token to header
 */
apiService.interceptors.request.use(
  (request) => {
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

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;
      try {
        await refreshAccessToken();
        const token = window.localStorage.getItem("token");
        if (token) {
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
        }
        return apiService(originalRequest);
      } catch (refreshError) {
        window.localStorage.removeItem("token");
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

/**
 * Refresh access token using refresh token from HTTP-only cookie
 * Called automatically when access token expires
 */
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

/**
 * Upload single image to Cloudinary
 * Returns image URL and public_id
 */
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  return apiService.post("/images/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/**
 * Upload multiple images to Cloudinary
 * Returns array of image URLs and public_ids
 */
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

/**
 * Update product with optional image upload
 * Combines product data and image in single request
 */
const updateProductWithImage = async (
  productId,
  productData,
  imageFile = null
) => {
  const formData = new FormData();

  Object.keys(productData).forEach((key) => {
    if (productData[key] !== null && productData[key] !== undefined) {
      formData.append(key, productData[key]);
    }
  });

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

export {
  uploadImage,
  uploadMultipleImages,
  updateProductWithImage,
  deleteImage,
};

export default apiService;
