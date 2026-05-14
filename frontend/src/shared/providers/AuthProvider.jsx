import { useEffect, useMemo, useState } from "react";

import { jwtDecode } from "jwt-decode";

import {
  getToken,
  setToken as saveToken,
  clearToken,
} from "../../services/auth/authStore";

import { AuthContext } from "../context/AuthContext";

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(getToken());

  // =========================
  // LOGOUT
  // =========================

  const logout = () => {
    clearToken();

    setToken(null);
  };

  // =========================
  // AUTO LOGOUT EVENT
  // =========================

  useEffect(() => {
    const handleUnauthorized = () => {
      logout();
    };

    window.addEventListener("unauthorized", handleUnauthorized);

    return () => {
      window.removeEventListener("unauthorized", handleUnauthorized);
    };
  }, []);

  // =========================
  // USER
  // =========================

  const user = useMemo(() => {
    if (!token) return null;

    try {
      const decoded = jwtDecode(token);

      return {
        name: decoded.username || "User",

        email: decoded.email || "No Email",
      };
    } catch (err) {
      console.error("Invalid token:", err);

      return null;
    }
  }, [token]);

  // =========================
  // LOGIN
  // =========================

  const login = (newToken) => {
    saveToken(newToken);

    setToken(newToken);
  };

  // =========================
  // VALUE
  // =========================

  const value = {
    token,

    user,

    isAuthenticated: !!token,

    login,

    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
