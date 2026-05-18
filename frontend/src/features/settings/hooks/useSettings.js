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
  };
}
