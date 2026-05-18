import { useSettings } from "./hooks/useSettings";

import SettingsSection from "./components/SettingsSection";
import SettingsToggle from "./components/SettingsToggle";
import SettingsSelect from "./components/SettingsSelect";
import SettingsInput from "./components/SettingsInput";

export default function Settings() {
  const {
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

    saved,
    saveSettings,
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

      <SettingsSection
        title="Notifications"
        description="Manage notification preferences."
      >
        <SettingsToggle
          label="Email Notifications"
          description="Receive important updates by email."
          checked={emailNotifications}
          onChange={setEmailNotifications}
        />

        <SettingsToggle
          label="Bill Reminders"
          description="Receive reminders before bills are due."
          checked={billReminders}
          onChange={setBillReminders}
        />
      </SettingsSection>
      <SettingsSection
        title="Account"
        description="Manage your account information."
      >
        <SettingsInput
          label="Username"
          description="Your public account username."
          value={username}
          onChange={setUsername}
          placeholder="Enter username"
        />

        <SettingsInput
          label="Email"
          description="Your account email address."
          type="email"
          value={email}
          onChange={setEmail}
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
    items-center
    justify-between
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
  );
}
