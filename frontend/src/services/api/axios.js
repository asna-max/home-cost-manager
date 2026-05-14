import axios from "axios";

import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
} from "../auth/authStore";

// =========================
// API BASE
// =========================

export const API_BASE = "http://127.0.0.1:8000";

// =========================
// AXIOS INSTANCE
// =========================

const api = axios.create({
  baseURL: `${API_BASE}/api`,
});

// =========================
// REQUEST INTERCEPTOR
// =========================

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => Promise.reject(error),
);

// =========================
// RESPONSE INTERCEPTOR
// =========================

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // =========================
    // TOKEN EXPIRED
    // =========================

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();

        // NO REFRESH TOKEN
        if (!refreshToken) {
          throw new Error("No refresh token");
        }

        // REFRESH REQUEST
        const response = await axios.post(`${API_BASE}/api/token/refresh/`, {
          refresh: refreshToken,
        });

        const newAccessToken = response.data.access;

        // SAVE NEW ACCESS TOKEN
        setTokens(newAccessToken, refreshToken);

        // UPDATE HEADER
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // RETRY ORIGINAL REQUEST
        return api(originalRequest);
      } catch (refreshError) {
        // REFRESH FAILED
        clearTokens();

        window.dispatchEvent(new Event("unauthorized"));

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
