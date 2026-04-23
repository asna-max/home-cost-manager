import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Bills from "./pages/Bills";
import Layout from "./components/Layout";

function App() {
  // Token direkt aus localStorage laden
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  const user = token
    ? (() => {
        try {
          const decoded = jwtDecode(token);
          return {
            name: decoded.username || "User",
            email: decoded.email || "no-email",
          };
        } catch {
          return null;
        }
      })()
    : null;

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
          {
            <Layout
              token={token}
              user={user}
              handleLogout={handleLogout}
              selectedHousehold={selectedHousehold}
              setSelectedHousehold={setSelectedHousehold}
            >
              <Routes>
                <Route
                  path="/bills"
                  element={
                    <Bills
                      token={token}
                      selectedHousehold={selectedHousehold}
                    />
                  }
                />
              </Routes>
            </Layout>
          }
        </>
      )}
    </Router>
  );
}

export default App;
