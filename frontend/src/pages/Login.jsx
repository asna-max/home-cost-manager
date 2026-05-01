import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../services/auth/authService";
import { setToken as saveToken } from "../services/auth/authStore";

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

      // Redirect
      navigate("/bills");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin} disabled={!username || !password}>
        Login
      </button>
    </div>
  );
}
