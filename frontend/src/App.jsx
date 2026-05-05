import { useState, useEffect, useMemo } from "react";
import { jwtDecode } from "jwt-decode";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Bills from "./pages/Bills";
import UploadBill from "./pages/UploadBill";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import HomeProfile from "./components/HomeProfile";

import { getToken, clearToken } from "./services/auth/authStore";

function App() {
  const [token, setToken] = useState(getToken());
  const [selectedHousehold, setSelectedHousehold] = useState(null);

  // =========================
  // AUTO LOGOUT
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
  // USER AUS JWT
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
        {/* ROOT */}
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

        {/* LOGIN */}
        <Route path="/login" element={<Login setToken={setToken} />} />

        {/* ================= BILLS ================= */}
        <Route
          path="/bills"
          element={
            <ProtectedRoute>
              <Layout
                user={user}
                handleLogout={handleLogout}
                selectedHousehold={selectedHousehold}
                setSelectedHousehold={setSelectedHousehold}
              >
                <Bills selectedHousehold={selectedHousehold} />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* ================= UPLOAD ================= */}
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <Layout
                user={user}
                handleLogout={handleLogout}
                selectedHousehold={selectedHousehold}
                setSelectedHousehold={setSelectedHousehold}
              >
                <UploadBill selectedHousehold={selectedHousehold} />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* ================= HOME PROFILE ================= */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Layout
                user={user}
                handleLogout={handleLogout}
                selectedHousehold={selectedHousehold}
                setSelectedHousehold={setSelectedHousehold}
              >
                {({ refreshHouseholds, isOwner }) => (
                  <HomeProfile
                    selectedHousehold={selectedHousehold}
                    refreshHouseholds={refreshHouseholds}
                    isOwner={isOwner}
                    setSelectedHousehold={setSelectedHousehold}
                  />
                )}
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
