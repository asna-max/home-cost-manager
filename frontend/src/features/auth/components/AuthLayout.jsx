export default function AuthLayout({ children, hero }) {
  return (
    <div
      className="
        min-h-screen
        bg-gray-100
        dark:bg-gray-900
        grid
        grid-cols-1
        lg:grid-cols-2
      "
    >
      {/* LEFT */}

      <div
        className="
          flex
          items-center
          justify-center
          p-10
        "
      >
        <div className="w-full max-w-md">{children}</div>
      </div>

      {/* RIGHT */}

      <div
        className="
          hidden
          lg:flex
          items-center
          justify-center
          bg-white
          dark:bg-gray-800
          p-10
          border-l
          border-gray-200
          dark:border-gray-700
        "
      >
        <div className="max-w-xl">{hero}</div>
      </div>
    </div>
  );
}
