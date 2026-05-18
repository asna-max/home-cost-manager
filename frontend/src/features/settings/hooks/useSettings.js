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

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  // =========================
  // CURRENCY
  // =========================
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem("currency") || "CHF";
  });
  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  // =========================
  // NOTIFICATIONS
  // =========================
  const [emailNotifications, setEmailNotifications] = useState(() => {
    return localStorage.getItem("email_notifications") === "true";
  });

  const [billReminders, setBillReminders] = useState(() => {
    return localStorage.getItem("bill_reminders") === "true";
  });

  useEffect(() => {
    localStorage.setItem("email_notifications", emailNotifications);
  }, [emailNotifications]);

  useEffect(() => {
    localStorage.setItem("bill_reminders", billReminders);
  }, [billReminders]);

  // =========================
  // ACCOUNT SETTINGS
  // =========================
  const [username, setUsername] = useState(() => {
    return localStorage.getItem("settings_username") || "";
  });

  const [email, setEmail] = useState(() => {
    return localStorage.getItem("settings_email") || "";
  });
  useEffect(() => {
    localStorage.setItem("settings_username", username);
  }, [username]);

  useEffect(() => {
    localStorage.setItem("settings_email", email);
  }, [email]);

  return {
    darkMode,
    setDarkMode,

    language,
    setLanguage,

    currency,
    setCurrency,

    emailNotifications,
    setEmailNotifications,

    billReminders,
    setBillReminders,

    username,
    setUsername,

    email,
    setEmail,
  };
}
