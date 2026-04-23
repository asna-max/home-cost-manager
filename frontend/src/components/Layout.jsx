import { Link } from "react-router-dom";
import HouseholdSwitcher from "./HouseholdSwitcher";
import UserMenu from "./UserMenu";

export default function Layout({
  children,
  user,
  handleLogout,
  token,
  selectedHousehold,
  setSelectedHousehold,
}) {
  const path = window.location.pathname.replace("/", "") || "dashboard";
  const title = path.charAt(0).toUpperCase() + path.slice(1);

  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <SidebarLink to="/dashboard" label="Dashboard" path={path} />
          <SidebarLink to="/home" label="Home Profile" path={path} />
          <SidebarLink to="/bills" label="Bills" path={path} />
          <SidebarLink to="/upload" label="Upload Bill" path={path} />
          <SidebarLink to="/settings" label="Settings" path={path} />
        </div>

        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* Main */}
      <div className="main">
        {/* Topbar */}
        <div className="topbar">
          <div>
            <h2 style={{ margin: 0 }}>{title}</h2>

            <div style={{ marginTop: "12px" }}>
              <HouseholdSwitcher
                token={token}
                selectedHousehold={selectedHousehold}
                setSelectedHousehold={setSelectedHousehold}
              />
            </div>
          </div>

          <div>
            {user && <UserMenu user={user} handleLogout={handleLogout} />}
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}

function SidebarLink({ to, label, path }) {
  const isActive = path === to.replace("/", "");

  return (
    <Link to={to} className={isActive ? "active" : ""}>
      {label}
    </Link>
  );
}
