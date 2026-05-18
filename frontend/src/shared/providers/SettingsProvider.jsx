import { useEffect, useState } from "react";

import { SettingsContext } from "../context/SettingsContext";

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
    settings,

    updateSetting,

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
