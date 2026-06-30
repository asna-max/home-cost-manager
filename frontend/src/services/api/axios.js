import axios from "axios";
import { jwtDecode } from "jwt-decode";

import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
} from "../auth/authStore";

// =========================
// API BASE
// =========================

//export const API_BASE = "http://10.77.164.57:8000";
//export const API_BASE = "http://127.0.0.1:8000";
const API_BASE = import.meta.env.VITE_API_URL;

// =========================
// AXIOS INSTANCE
// =========================

const api = axios.create({
  baseURL: `${API_BASE}/api`,
});

// =========================
// REFRESH LOCK
// =========================
let refreshPromise = null;
const PUBLIC_ROUTES = ["/auth/login/", "/auth/register/"];

// =========================
// REFRESH ACCESS TOKEN
// =========================
async function refreshAccessToken() {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    throw new Error("No refresh token");
  }

  // ONLY ONE REFRESH REQUEST
  if (!refreshPromise) {
    refreshPromise = axios
      .post(`${API_BASE}/api/token/refresh/`, {
        refresh: refreshToken,
      })
      .then((response) => {
        const newAccessToken = response.data.access;

        // SAVE TOKENS
        setTokens(newAccessToken, refreshToken);

        // UPDATE GLOBAL HEADER
        api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

        // UPDATE REACT
        window.dispatchEvent(new Event("tokenRefreshed"));

        return newAccessToken;
      })
      .catch((error) => {
        clearTokens();

        window.dispatchEvent(new Event("unauthorized"));

        throw error;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

function isPublicRoute(url) {
  return PUBLIC_ROUTES.some((route) => url?.includes(route));
}

// =========================
// REQUEST INTERCEPTOR
// =========================

api.interceptors.request.use(
  async (config) => {
    let accessToken = getAccessToken();

    // =========================
    // CHECK TOKEN EXPIRY
    // =========================

    if (accessToken) {
      try {
        const decoded = jwtDecode(accessToken);

        // REFRESH 30 SEC BEFORE EXPIRY
        const willExpireSoon = decoded.exp * 1000 < Date.now() + 30000;

        // REFRESH TOKEN
        if (willExpireSoon) {
          accessToken = await refreshAccessToken();
        }
      } catch (error) {
        console.error("Token validation failed:", error);

        clearTokens();

        window.dispatchEvent(new Event("unauthorized"));
      }
    }

    // =========================
    // SET AUTH HEADER
    // =========================
    if (accessToken && !isPublicRoute(config.url)) {
      config.headers.Authorization = `Bearer ${accessToken}`;
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
    const status = error.response?.status;

    // =========================
    // UNAUTHORIZED
    // =========================

    if (status === 401) {
      clearTokens();

      window.dispatchEvent(new Event("unauthorized"));
    }

    return Promise.reject(error);
  },
);

export default api;
