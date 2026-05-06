import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../../services/auth/authService";
import { setToken as saveToken } from "../../services/auth/authStore";

export default function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    try {
      const data = await login(username, password);

      if (!data?.access) {
        throw new Error("Invalid username or password");
      }

      saveToken(data.access);
      setToken(data.access);

      navigate("/bills");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Login
        </h2>

        {error && (
          <div className="mb-4 text-sm text-red-500 bg-red-100 p-2 rounded">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={handleLogin}
            disabled={!username || !password}
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-300 transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
