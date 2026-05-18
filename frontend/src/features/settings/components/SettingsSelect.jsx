export default function SettingsSelect({
  label,
  description,
  value,
  onChange,
  options = [],
}) {
  return (
    <div className="flex flex-col gap-3 md:flex-row, md:items-center, md:justify-between">
      {/* TEXT */}
      <div>
        <h3 className="font-medium text-gray-900 dark:text-white">{label}</h3>
        {description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {" "}
            {description}
          </p>
        )}
      </div>
      {/* SELECT */}

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-w-[220px] px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
