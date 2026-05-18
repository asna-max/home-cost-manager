import { useEffect, useState } from "react";

import { useTheme } from "../../../shared/hooks/useTheme";

// =========================
// STORAGE KEY
// =========================
const SETTINGS_KEY = "homecost_settings";
const DEFAULT_SETTINGS = {
  language: "en",

  currency: "CHF",

  emailNotifications: false,

  billReminders: false,

  username: "",

  email: "",
};

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

    return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
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

  // =========================
  // RESET SETTING
  // =========================

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);

    localStorage.removeItem(SETTINGS_KEY);

    setSaved(false);
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
    resetSettings,
  };
}
