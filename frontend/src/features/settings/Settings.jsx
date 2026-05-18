import { useSettings } from "./hooks/useSettings";

import SettingsSection from "./components/SettingsSection";
import SettingsToggle from "./components/SettingsToggle";
import SettingsSelect from "./components/SettingsSelect";
import SettingsInput from "./components/SettingsInput";

export default function Settings() {
  const {
    darkMode,
    setDarkMode,

    settings,
    updateSetting,

    saved,
    saveSettings,
    resetSettings,
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
          value={settings.language}
          onChange={(value) => updateSetting("language", value)}
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
          value={settings.currency}
          onChange={(value) => updateSetting("currency", value)}
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

      <SettingsSection
        title="Notifications"
        description="Manage notification preferences."
      >
        <SettingsToggle
          label="Email Notifications"
          description="Receive important updates by email."
          checked={settings.emailNotifications}
          onChange={(value) => updateSetting("emailNotifications", value)}
        />

        <SettingsToggle
          label="Bill Reminders"
          description="Receive reminders before bills are due."
          checked={settings.billReminders}
          onChange={(value) => updateSetting("billReminders", value)}
        />
      </SettingsSection>
      <SettingsSection
        title="Account"
        description="Manage your account information."
      >
        <SettingsInput
          label="Username"
          description="Your public account username."
          value={settings.username}
          onChange={(value) => updateSetting("username", value)}
          placeholder="Enter username"
        />

        <SettingsInput
          label="Email"
          description="Your account email address."
          type="email"
          value={settings.email}
          onChange={(value) => updateSetting("email", value)}
          placeholder="Enter email"
        />

        <button
          className="
      px-4
      py-2
      bg-blue-500
      hover:bg-blue-600
      text-white
      rounded-xl
      transition
    "
        >
          Change Password
        </button>
      </SettingsSection>

      <div
        className="
    flex
    flex-col
    md:flex-row
    md:items-center
    md:justify-between
    gap-4
    pt-2
  "
      >
        {/* FEEDBACK */}

        <div>
          {saved && (
            <p
              className="
          text-sm
          text-green-500
        "
            >
              Settings saved successfully.
            </p>
          )}
        </div>

        {/* BUTTON */}

        <div className="flex gap-3">
          {/* RESET */}

          <button
            onClick={resetSettings}
            className="
      px-5
      py-3
      bg-red-500
      hover:bg-red-600
      text-white
      rounded-xl
      transition
      font-medium
    "
          >
            Reset Settings
          </button>

          {/* SAVE */}

          <button
            onClick={saveSettings}
            className="
      px-5
      py-3
      bg-blue-500
      hover:bg-blue-600
      text-white
      rounded-xl
      transition
      font-medium
    "
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
