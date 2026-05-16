export default function SettingsToggle({
  label,
  description,
  checked,
  onChange,
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-6
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

      {/* TOGGLE */}

      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`
          relative
          w-14
          h-8
          rounded-full
          transition
          ${checked ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600"}
        `}
      >
        <span
          className={`
            absolute
            top-1
            w-6
            h-6
            bg-white
            rounded-full
            shadow
            transition
            ${checked ? "right-1" : "left-1"}
          `}
        />
      </button>
    </div>
  );
}
