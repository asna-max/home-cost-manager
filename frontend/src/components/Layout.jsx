import { Link, useLocation } from "react-router-dom";
import HouseholdSwitcher from "./HouseholdSwitcher";
import UserMenu from "./UserMenu";

export default function Layout({
  children,
  user,
  handleLogout,
  selectedHousehold,
  setSelectedHousehold,
}) {
  const location = useLocation();

  const path = location.pathname.replace("/", "") || "dashboard";

  const titleMap = {
    dashboard: "Dashboard",
    home: "Home Profile",
    bills: "Bills",
    upload: "Upload Bill",
    settings: "Settings",
  };

  const title = titleMap[path] || "App";

  return (
    <div className="container">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <nav className="sidebar-nav">
          <SidebarLink to="/dashboard" label="Dashboard" path={path} />
          <SidebarLink to="/home" label="Home Profile" path={path} />
          <SidebarLink to="/bills" label="Bills" path={path} />
          <SidebarLink to="/upload" label="Upload Bill" path={path} />
          <SidebarLink to="/settings" label="Settings" path={path} />
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      {/* MAIN */}
      <main className="main">
        {/* HEADER */}
        <div className="page-header">
          <div>
            <h1 className="page-title">{title}</h1>
          </div>

          <div className="header-right">
            {user && <UserMenu user={user} handleLogout={handleLogout} />}

            <HouseholdSwitcher
              selectedHousehold={selectedHousehold}
              setSelectedHousehold={setSelectedHousehold}
            />
          </div>
        </div>

        {/* CONTENT */}
        {children}
      </main>
    </div>
  );
}

/* ============================= */
/* Sidebar Link */
/* ============================= */
function SidebarLink({ to, label, path }) {
  const isActive = path === to.replace("/", "");

  return (
    <Link to={to} className={isActive ? "active" : ""}>
      {label}
    </Link>
  );
}
