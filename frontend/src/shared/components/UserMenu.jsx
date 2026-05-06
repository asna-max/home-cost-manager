import { useState, useRef, useEffect } from "react";

export default function UserMenu({ user, handleLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!ref.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="user-menu" ref={ref}>
      <button className="avatar-btn" onClick={() => setOpen((prev) => !prev)}>
        {getInitials()}
      </button>

      {open && (
        <div className="user-dropdown">
          <div className="user-name">{user?.name}</div>
          <div className="user-email">{user?.email}</div>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
