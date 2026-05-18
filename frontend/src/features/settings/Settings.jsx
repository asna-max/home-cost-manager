import { useSettings } from "./hooks/useSettings";

import SettingsSection from "./components/SettingsSection";
import SettingsToggle from "./components/SettingsToggle";
import SettingsSelect from "./components/SettingsSelect";

export default function Settings() {
  const {
    darkMode,
    setDarkMode,

    language,
    setLanguage,

    currency,
    setCurrency,
  } = useSettings();

  return (
    <div className="space-y-8">
      {/* HEADER */}

      <div>
        <h1
          className="
            text-3xl
            font-bold
            text-gray-900
            dark:text-white
          "
        >
          Settings
        </h1>

        <p
          className="
            text-gray-500
            dark:text-gray-400
            mt-2
          "
        >
          Manage your application preferences.
        </p>
      </div>

      {/* APPEARANCE */}

      <SettingsSection
        title="Appearance"
        description="Customize the application appearance."
      >
        <SettingsToggle
          label="Dark Mode"
          description="Enable dark appearance for the application."
          checked={darkMode}
          onChange={setDarkMode}
        />
      </SettingsSection>

      {/* LOCALIZATION */}

      <SettingsSection
        title="Localization"
        description="Manage regional application settings."
      >
        <SettingsSelect
          label="Language"
          description="Select your application language."
          value={language}
          onChange={setLanguage}
          options={[
            {
              label: "English",
              value: "en",
            },
            {
              label: "Deutsch",
              value: "de",
            },
          ]}
        />

        <SettingsSelect
          label="Currency"
          description="Select your preferred currency."
          value={currency}
          onChange={setCurrency}
          options={[
            {
              label: "Swiss Franc (CHF)",
              value: "CHF",
            },
            {
              label: "Euro (EUR)",
              value: "EUR",
            },
            {
              label: "US Dollar (USD)",
              value: "USD",
            },
          ]}
        />
      </SettingsSection>
    </div>
  );
}
