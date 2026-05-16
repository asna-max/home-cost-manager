export default function AuthHero() {
  return (
    <div className="space-y-8">
      {/* TITLE */}

      <div className="space-y-4">
        <h1
          className="
            text-5xl
            font-bold
            text-gray-900
            dark:text-white
            leading-tight
          "
        >
          Home Cost Manager
        </h1>

        <p
          className="
            text-xl
            text-gray-600
            dark:text-gray-400
            leading-relaxed
          "
        >
          Track your household expenses easily and stay in control of your
          monthly budget.
        </p>
      </div>

      {/* IMAGE */}

      <div
        className="
          rounded-3xl
          overflow-hidden
          shadow-xl
          border
          border-gray-200
          dark:border-gray-700
          bg-gray-50
          dark:bg-gray-800
        "
      >
        <img
          src="/auth-preview.png"
          alt="HomeCost Preview"
          className="
            w-full
            object-cover
          "
        />
      </div>
    </div>
  );
}
