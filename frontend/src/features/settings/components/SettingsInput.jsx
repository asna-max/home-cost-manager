export default function SettingsInput({
  label,
  description,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div
      className="
        flex
        flex-col
        gap-3
        md:flex-row
        md:items-center
        md:justify-between
      "
    >
      {/* TEXT */}

      <div>
        <h3
          className="
            font-medium
            text-gray-900
            dark:text-white
          "
        >
          {label}
        </h3>

        {description && (
          <p
            className="
              text-sm
              text-gray-500
              dark:text-gray-400
              mt-1
            "
          >
            {description}
          </p>
        )}
      </div>

      {/* INPUT */}

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="
          min-w-[220px]
          px-4
          py-2
          rounded-xl
          border
          border-gray-300
          dark:border-gray-700
          bg-white
          dark:bg-gray-800
          text-gray-800
          dark:text-white
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          transition
        "
      />
    </div>
  );
}
