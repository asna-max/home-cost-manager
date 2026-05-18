import { useEffect, useState } from "react";
import { SettingsContext } from "../context/SettingsContext";
import { useTheme } from "../hooks/useTheme";

// =========================
// STORAGE KEY
// =========================

const SETTINGS_KEY = "homecost_settings";

// =========================
// DEFAULTS
// =========================

const DEFAULT_SETTINGS = {
  language: "en",

  currency: "CHF",

  emailNotifications: false,

  billReminders: false,

  username: "",

  email: "",
};

export default function SettingsProvider({ children }) {
  const { darkMode, setDarkMode } = useTheme();
  // =========================
  // SETTINGS
  // =========================

  const [settings, setSettings] = useState(() => {
    const stored = localStorage.getItem(SETTINGS_KEY);

    return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
  });

  // =========================
  // SAVED
  // =========================

  const [saved, setSaved] = useState(false);

  // =========================
  // SAVE STORAGE
  // =========================

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  // =========================
  // UPDATE
  // =========================

  const updateSetting = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // =========================
  // SAVE
  // =========================

  const saveSettings = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  // =========================
  // RESET
  // =========================

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);

    localStorage.removeItem(SETTINGS_KEY);

    setSaved(false);
  };

  // =========================
  // VALUE
  // =========================

  const value = {
    // THEME
    darkMode,
    setDarkMode,

    // SETTINGS
    settings,
    updateSetting,

    // ACTIONS
    saved,
    saveSettings,
    resetSettings,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}
