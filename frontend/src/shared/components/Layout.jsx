import { Link, useLocation } from "react-router-dom";
import HouseholdSwitcher from "./HouseholdSwitcher";
import UserMenu from "./UserMenu";
import { useHousehold } from "../hooks/useHousehold";

export default function Layout({ children, user, handleLogout }) {
  const location = useLocation();

  const {
    households,
    selectedHousehold,
    setSelectedHousehold,
    createHousehold,
  } = useHousehold();

  const path = location.pathname;

  const navItems = [
    { to: "/home", label: "Home" },
    { to: "/bills", label: "Bills" },
    { to: "/upload", label: "Upload" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-60 bg-white border-r shadow-sm flex flex-col justify-between">
        <div className="p-5">
          {/* LOGO / TITLE */}
          <h2 className="text-xl font-semibold mb-6">HomeCost</h2>

          {/* NAV */}
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = path === item.to;

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`px-4 py-2 rounded-md text-sm transition
                    ${
                      isActive
                        ? "bg-blue-500 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* LOGOUT */}
        <div className="p-5">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <div className="flex flex-col flex-1">
        {/* HEADER */}
        <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800 capitalize">
            {path.replace("/", "") || "dashboard"}
          </h1>

          <div className="flex items-center gap-4">
            <UserMenu user={user} handleLogout={handleLogout} />

            <HouseholdSwitcher
              households={households}
              selectedHousehold={selectedHousehold}
              setSelectedHousehold={setSelectedHousehold}
              onCreateHousehold={createHousehold}
            />
          </div>
        </header>

        {/* CONTENT */}
        <main className="p-6 overflow-auto flex-1">{children}</main>
      </div>
    </div>
  );
}
