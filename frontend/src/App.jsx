import { useState, useEffect, useMemo } from "react";
import { jwtDecode } from "jwt-decode";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./features/auth/Login";
import Bills from "./features/bills/Bills";
import UploadBill from "./features/upload/UploadBill";
import HomeProfile from "./features/home/HomeProfile";

import Layout from "./shared/components/Layout";
import ProtectedRoute from "./shared/components/ProtectedRoute";

import { getToken, clearToken } from "./services/auth/authStore";

function App() {
  const [token, setToken] = useState(getToken());

  // =========================
  // AUTO LOGOUT (401)
  // =========================
  useEffect(() => {
    const handleUnauthorized = () => {
      clearToken();
      setToken(null);
    };

    window.addEventListener("unauthorized", handleUnauthorized);

    return () => {
      window.removeEventListener("unauthorized", handleUnauthorized);
    };
  }, []);

  // =========================
  // USER AUS TOKEN
  // =========================
  const user = useMemo(() => {
    if (!token) return null;

    try {
      const decoded = jwtDecode(token);

      return {
        name: decoded.username || "User",
        email: decoded.email || "no-email",
      };
    } catch (e) {
      console.error("Invalid token:", e);
      return null;
    }
  }, [token]);

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    clearToken();
    setToken(null);
  };

  return (
    <Router>
      <Routes>
        {/* ================= ROOT ================= */}
        <Route
          path="/"
          element={
            token ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* ================= LOGIN ================= */}
        <Route path="/login" element={<Login setToken={setToken} />} />

        {/* ================= HOME ================= */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Layout user={user} handleLogout={handleLogout}>
                <HomeProfile />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* ================= BILLS ================= */}
        <Route
          path="/bills"
          element={
            <ProtectedRoute>
              <Layout user={user} handleLogout={handleLogout}>
                <Bills />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* ================= UPLOAD ================= */}
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <Layout user={user} handleLogout={handleLogout}>
                <UploadBill />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
