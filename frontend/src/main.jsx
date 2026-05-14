import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./shared/providers/AuthProvider.jsx";
import HouseholdProvider from "./shared/providers/HouseholdProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <HouseholdProvider>
        <App />
      </HouseholdProvider>
    </AuthProvider>
  </StrictMode>,
);
