import SettingsSection from "./components/SettingsSection";

export default function Settings() {
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>

        <p className="text-gray-500 mt-2">
          Manage your application preferences.
        </p>
      </div>

      {/* CONTENT */}
      <SettingsSection
        title="General"
        description="Manage your general application settings."
      >
        <p className="text-gray-600">Settings content coming soon.</p>
      </SettingsSection>
    </div>
  );
}
