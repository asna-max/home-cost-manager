import { useTheme } from "../../shared/hooks/useTheme";

import SettingsSection from "./components/SettingsSection";
import SettingsToggle from "./components/SettingsToggle";

export default function Settings() {
  const { darkMode, setDarkMode } = useTheme();

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

      {/* CONTENT */}

      <SettingsSection
        title="General"
        description="Manage your general application settings."
      >
        <SettingsToggle
          label="Dark Mode"
          description="Enable dark appearance for the application."
          checked={darkMode}
          onChange={setDarkMode}
        />
      </SettingsSection>
    </div>
  );
}
