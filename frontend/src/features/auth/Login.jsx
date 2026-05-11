import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import { login } from "../../services/auth/authService";

import { setToken as saveToken } from "../../services/auth/authStore";

import AuthLayout from "./components/AuthLayout";
import AuthHero from "./components/AuthHero";
import AuthInput from "./components/AuthInput";

export default function Login({ setToken }) {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // =========================
  // LOGIN
  // =========================

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      const data = await login(username, password);

      if (!data?.access) {
        throw new Error("Invalid username or password");
      }

      saveToken(data.access);

      setToken(data.access);

      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // UI
  // =========================

  return (
    <AuthLayout hero={<AuthHero />}>
      <form
        onSubmit={handleLogin}
        className="
          bg-white
          rounded-2xl
          shadow-xl
          p-8
          space-y-6
        "
      >
        {/* HEADER */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-900">Login</h2>

          <p className="text-gray-500">Welcome back to HomeCost</p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-100 text-red-600 text-sm p-3 rounded-xl">
            {error}
          </div>
        )}

        {/* USERNAME */}
        <AuthInput
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        />

        {/* PASSWORD */}
        <AuthInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={!username || !password || loading}
          className="
            w-full
            bg-blue-500
            text-white
            py-3
            rounded-xl
            hover:bg-blue-600
            disabled:bg-gray-300
            transition
            font-medium
          "
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* REGISTER */}
        <p className="text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
