import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "./components/AuthLayout";
import AuthHero from "./components/AuthHero";
import AuthInput from "./components/AuthInput";
import PasswordRequirements from "./components/PasswordRequirements";

import { validatePassword } from "./utils/passwordValidation";
import { register } from "../../services/auth/authService";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const validation = validatePassword(password);

  // =========================
  // REGISTER
  // =========================

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");

    // PASSWORD CHECK
    if (password !== confirmPassword) {
      setError("Passwords do not match");

      return;
    }

    try {
      setLoading(true);

      await register({
        username,
        email,
        password,
      });

      navigate("/");
    } catch (err) {
      setError(err.message || "Registration failed");
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
        onSubmit={handleRegister}
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
            Register
          </h2>

          <p
            className="
              text-gray-500
              dark:text-gray-400
            "
          >
            Create your HomeCost account
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

        {/* EMAIL */}
        <AuthInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />

        {/* PASSWORD */}
        <AuthInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />

        {/* PASSWORD REQUIREMENTS */}
        <PasswordRequirements validation={validation} />

        {/* CONFIRM PASSWORD */}
        <AuthInput
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Repeat password"
        />

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={
            !username || !email || !password || !confirmPassword || loading
          }
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
          {loading ? "Creating account..." : "Register"}
        </button>

        {/* LOGIN */}
        <p
          className="
            text-sm
            text-center
            text-gray-500
            dark:text-gray-400
          "
        >
          Already have an account?{" "}
          <Link
            to="/"
            className="
              text-blue-500
              hover:underline
            "
          >
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
