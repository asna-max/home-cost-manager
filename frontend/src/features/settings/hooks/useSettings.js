import { useEffect, useState } from "react";
import { useTheme } from "../../../shared/hooks/useTheme";

export function useSettings() {
  // =========================
  // THEME
  // =========================
  const { darkMode, setDarkMode } = useTheme();

  // =========================
  // LANGUAGE
  // =========================

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "en";
  });

  // =========================
  // SAVE LANGUAGE
  // =========================

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return {
    darkMode,
    setDarkMode,

    language,
    setLanguage,
  };
}
