import { useState, useRef, useEffect } from "react";

export default function UserMenu({ user, handleLogout }) {
  const [open, setOpen] = useState(false);

  const ref = useRef(null);

  // =========================
  // INITIALS
  // =========================

  const getInitials = () => {
    if (!user?.name) return "U";

    return user.name
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // =========================
  // CLOSE ON OUTSIDE CLICK
  // =========================

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!ref.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* AVATAR */}

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="
          w-10
          h-10
          rounded-full
          bg-blue-500
          text-white
          font-bold
          flex
          items-center
          justify-center
          hover:bg-blue-600
          transition
        "
      >
        {getInitials()}
      </button>

      {/* DROPDOWN */}

      {open && (
        <div
          className="
            absolute
            right-0
            mt-2
            w-56
            bg-white
            dark:bg-gray-800
            rounded-lg
            shadow-lg
            border
            border-gray-200
            dark:border-gray-700
            z-50
          "
        >
          {/* USER INFO */}

          <div
            className="
              p-4
              border-b
              border-gray-200
              dark:border-gray-700
            "
          >
            <div
              className="
                font-semibold
                text-gray-800
                dark:text-white
              "
            >
              {user?.name || "User"}
            </div>

            <div
              className="
                text-sm
                text-gray-500
                dark:text-gray-400
              "
            >
              {user?.email || "no-email"}
            </div>
          </div>

          {/* LOGOUT */}

          <button
            onClick={handleLogout}
            className="
              w-full
              text-left
              px-4
              py-3
              text-red-500
              hover:bg-gray-100
              dark:hover:bg-gray-700
              transition
            "
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
