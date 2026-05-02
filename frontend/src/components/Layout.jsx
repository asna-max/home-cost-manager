import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import HouseholdSwitcher from "./HouseholdSwitcher";
import UserMenu from "./UserMenu";
import { getHouseholds } from "../services/householdService";

export default function Layout({
  children,
  user,
  handleLogout,
  selectedHousehold,
  setSelectedHousehold,
}) {
  const location = useLocation();
  const [households, setHouseholds] = useState([]);

  const path = location.pathname.replace("/", "") || "dashboard";

  const titleMap = {
    dashboard: "Dashboard",
    home: "Home Profile",
    bills: "Bills",
    upload: "Upload Bill",
    settings: "Settings",
  };

  const title = titleMap[path] || "App";

  // =========================
  // LOAD HOUSEHOLDS
  // =========================
  useEffect(() => {
    const fetchHouseholds = async () => {
      try {
        const data = await getHouseholds();

        if (Array.isArray(data)) {
          setHouseholds(data);

          if (!selectedHousehold && data.length > 0) {
            setSelectedHousehold(data[0].id);
          }
        }
      } catch (err) {
        console.error("Failed to load households:", err);
      }
    };

    fetchHouseholds();
  }, []);

  // =========================
  // REFRESH FUNCTION (für HomeProfile)
  // =========================
  const refreshHouseholds = async () => {
    try {
      const data = await getHouseholds();
      setHouseholds(data);
    } catch (err) {
      console.error("Refresh failed:", err);
    }
  };

  return (
    <div className="container">
      {/* ================= SIDEBAR ================= */}
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

      {/* ================= MAIN ================= */}
      <main className="main">
        {/* HEADER */}
        <div className="page-header">
          <div>
            <h1 className="page-title">{title}</h1>
          </div>

          <div className="header-right">
            {user && <UserMenu user={user} handleLogout={handleLogout} />}

            <HouseholdSwitcher
              households={households} // zentral gesteuert
              selectedHousehold={selectedHousehold}
              setSelectedHousehold={setSelectedHousehold}
            />
          </div>
        </div>

        {/* CONTENT */}
        {typeof children === "function"
          ? children({ refreshHouseholds })
          : children}
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
