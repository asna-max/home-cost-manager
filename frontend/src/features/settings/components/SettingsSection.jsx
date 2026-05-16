export default function SettingsSection({ title, description, children }) {
  return (
    <section
      className="
        bg-white
        dark:bg-gray-800
        rounded-2xl
        border
        border-gray-200
        dark:border-gray-700
        shadow-sm
        p-6
        space-y-6
      "
    >
      {/* HEADER */}

      <div>
        <h2
          className="
            text-xl
            font-semibold
            text-gray-900
            dark:text-white
          "
        >
          {title}
        </h2>

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

      {/* CONTENT */}

      <div className="space-y-4">{children}</div>
    </section>
  );
}
