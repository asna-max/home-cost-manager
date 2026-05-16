import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import { login as loginUser } from "../../services/auth/authService";

import AuthLayout from "./components/AuthLayout";
import AuthHero from "./components/AuthHero";
import AuthInput from "./components/AuthInput";

export default function Login({ login }) {
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

      const data = await loginUser(username, password);

      if (!data?.access) {
        throw new Error("Invalid username or password");
      }

      // AUTH LOGIN

      login(data.access, data.refresh);

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
          dark:bg-gray-800
          rounded-2xl
          shadow-xl
          border
          border-gray-200
          dark:border-gray-700
          p-8
          space-y-6
        "
      >
        {/* HEADER */}

        <div className="space-y-2">
          <h2
            className="
              text-3xl
              font-bold
              text-gray-900
              dark:text-white
            "
          >
            Login
          </h2>

          <p
            className="
              text-gray-500
              dark:text-gray-400
            "
          >
            Welcome back to HomeCost
          </p>
        </div>

        {/* ERROR */}

        {error && (
          <div
            className="
              bg-red-100
              dark:bg-red-900/30
              text-red-600
              dark:text-red-300
              text-sm
              p-3
              rounded-xl
            "
          >
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
            hover:bg-blue-600
            text-white
            py-3
            rounded-xl
            disabled:bg-gray-300
            dark:disabled:bg-gray-700
            transition
            font-medium
          "
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* REGISTER */}

        <p
          className="
            text-sm
            text-center
            text-gray-500
            dark:text-gray-400
          "
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            className="
              text-blue-500
              hover:underline
            "
          >
            Register
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
