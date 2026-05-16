import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import Bills from "./features/bills/Bills";
import UploadBill from "./features/upload/UploadBill";
import HomeProfile from "./features/home/HomeProfile";
import Dashboard from "./features/dashboard/Dashboard";
import Layout from "./shared/components/Layout";
import ProtectedRoute from "./shared/components/ProtectedRoute";
import Settings from "./features/settings/Settings";

import { useAuth } from "./shared/hooks/useAuth";

function App() {
  const { token, user, login, logout } = useAuth();

  return (
    <Router>
      <Routes>
        {/* ================= ROOT ================= */}

        <Route
          path="/"
          element={
            token ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* ================= LOGIN ================= */}

        <Route path="/login" element={<Login login={login} />} />

        {/* ================= REGISTER ================= */}

        <Route path="/register" element={<Register />} />

        {/* ================= DASHBOARD ================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout user={user} handleLogout={logout}>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* ================= HOME ================= */}

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Layout user={user} handleLogout={logout}>
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
              <Layout user={user} handleLogout={logout}>
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
              <Layout user={user} handleLogout={logout}>
                <UploadBill />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* ================= SETTINGS ================= */}

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Layout user={user} handleLogout={logout}>
                <Settings />
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
