import { useEffect, useState } from "react";

import { useTheme } from "../../../shared/hooks/useTheme";

// =========================
// STORAGE KEY
// =========================

const SETTINGS_KEY = "homecost_settings";

export function useSettings() {
  // =========================
  // THEME
  // =========================

  const { darkMode, setDarkMode } = useTheme();

  // =========================
  // SETTINGS STATE
  // =========================

  const [settings, setSettings] = useState(() => {
    const stored = localStorage.getItem(SETTINGS_KEY);

    return stored
      ? JSON.parse(stored)
      : {
          language: "en",

          currency: "CHF",

          emailNotifications: false,

          billReminders: false,

          username: "",

          email: "",
        };
  });

  // =========================
  // SAVED STATE
  // =========================

  const [saved, setSaved] = useState(false);

  // =========================
  // SAVE SETTINGS
  // =========================

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  // =========================
  // UPDATE SETTING
  // =========================

  const updateSetting = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // =========================
  // SAVE FEEDBACK
  // =========================

  const saveSettings = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  return {
    // THEME
    darkMode,
    setDarkMode,

    // SETTINGS
    settings,
    updateSetting,

    // SAVE
    saved,
    saveSettings,
  };
}
