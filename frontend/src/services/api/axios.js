import axios from "axios";

import {
  getToken,
  clearToken,
} from "../auth/authStore";

// =========================
// AXIOS INSTANCE
// =========================

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// =========================
// REQUEST INTERCEPTOR
// =========================

api.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
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

  (error) => {
    // AUTO LOGOUT
    if (error.response?.status === 401) {
      clearToken();

      window.dispatchEvent(
        new Event("unauthorized"),
      );
    }

    return Promise.reject(error);
  },
);

export default api;