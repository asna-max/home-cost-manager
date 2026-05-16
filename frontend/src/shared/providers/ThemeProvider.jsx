import { useEffect, useState } from "react";

import { ThemeContext } from "../context/ThemeContext";

export default function ThemeProvider({ children }) {
  // =========================
  // INITIAL THEME
  // =========================

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("dark_mode") === "true";
  });

  // =========================
  // APPLY THEME
  // =========================

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("dark_mode", darkMode);
  }, [darkMode]);

  // =========================
  // CONTEXT VALUE
  // =========================

  const value = {
    darkMode,

    setDarkMode,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
