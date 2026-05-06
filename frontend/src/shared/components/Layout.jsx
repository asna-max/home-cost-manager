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

  // aktueller Pfad (z.B. "bills")
  const path = location.pathname.replace("/", "") || "dashboard";

  const titleMap = {
    dashboard: "Dashboard",
    home: "Home Profile",
    bills: "Bills",
    upload: "Upload Bill",
    settings: "Settings",
  };

  const isActive = (route) => path === route;

  return (
    <div className="container">
      {/* ================= SIDEBAR ================= */}
      <aside className="sidebar">
        <nav className="sidebar-nav">
          <SidebarLink
            to="/dashboard"
            label="Dashboard"
            active={isActive("dashboard")}
          />
          <SidebarLink
            to="/home"
            label="Home Profile"
            active={isActive("home")}
          />
          <SidebarLink to="/bills" label="Bills" active={isActive("bills")} />
          <SidebarLink
            to="/upload"
            label="Upload Bill"
            active={isActive("upload")}
          />
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="main">
        {/* HEADER */}
        <div className="page-header">
          <h1 className="page-title">{titleMap[path] || "App"}</h1>

          <div className="header-right">
            <UserMenu user={user} handleLogout={handleLogout} />

            <HouseholdSwitcher
              households={households}
              selectedHousehold={selectedHousehold}
              setSelectedHousehold={setSelectedHousehold}
              onCreateHousehold={createHousehold}
            />
          </div>
        </div>

        {/* CONTENT */}
        <div className="page-content">{children}</div>
      </main>
    </div>
  );
}

/* ================= Sidebar Link Component ================= */
function SidebarLink({ to, label, active }) {
  return (
    <Link to={to} className={active ? "sidebar-link active" : "sidebar-link"}>
      {label}
    </Link>
  );
}
