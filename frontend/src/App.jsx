import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";

import Login from "./pages/Login";
import Bills from "./pages/Bills";
import Invitations from "./pages/Invitations";
import HouseholdSwitcher from "./components/HouseholdSwitcher";

function App() {
  // Token direkt aus localStorage laden
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  // Globaler Household State
  const [selectedHousehold, setSelectedHousehold] = useState(null);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <Router>
      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <>
          {/* NAVIGATION */}
          <nav style={{ marginBottom: "20px" }}>
            <HouseholdSwitcher
              token={token}
              selectedHousehold={selectedHousehold}
              setSelectedHousehold={setSelectedHousehold}
            />
            <Link to="/bills">Bills</Link> |{" "}
            <Link to="/invitations">Invitations</Link> |{" "}
            <button onClick={handleLogout}>Logout</button>
          </nav>

          {/* ROUTES */}
          <Routes>
            <Route
              path="/bills"
              element={
                <Bills token={token} selectedHousehold={selectedHousehold} />
              }
            />

            <Route
              path="/invitations"
              element={<Invitations token={token} />}
            />

            <Route path="*" element={<Navigate to="/bills" />} />
          </Routes>
        </>
      )}
    </Router>
  );
}

export default App;
