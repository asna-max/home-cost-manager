import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./shared/providers/AuthProvider.jsx";
import HouseholdProvider from "./shared/providers/HouseholdProvider.jsx";
import ThemeProvider from "./shared/providers/ThemeProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <HouseholdProvider>
          <App />
        </HouseholdProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);
