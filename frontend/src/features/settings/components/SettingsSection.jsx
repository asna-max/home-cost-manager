export default function SettingsSection({ title, description, children }) {
  return (
    <section
      className="
        bg-white
        rounded-2xl
        border
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
          "
        >
          {title}
        </h2>

        {description && (
          <p
            className="
              text-sm
              text-gray-500
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
