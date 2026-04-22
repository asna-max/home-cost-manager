import { useEffect, useState } from "react";
import {
  getInvitations,
  acceptInvitation,
  declineInvitation,
} from "../services/api";

export default function Invitations({ token }) {
  const [invitations, setInvitations] = useState([]);

  // Daten laden
  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      const data = await getInvitations(token);

      if (Array.isArray(data)) {
        setInvitations(data);
      } else {
        setInvitations([]);
      }
    };

    fetchData();
  }, [token]);

  // Accept
  const handleAccept = async (id) => {
    await acceptInvitation(token, id);

    // UI direkt aktualisieren
    setInvitations((prev) => prev.filter((inv) => inv.id !== id));
  };

  // Decline
  const handleDecline = async (id) => {
    await declineInvitation(token, id);

    setInvitations((prev) => prev.filter((inv) => inv.id !== id));
  };

  return (
    <div>
      <h2>Invitations</h2>

      {invitations.length === 0 ? (
        <p>No invitations</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Household</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {invitations.map((inv) => (
              <tr key={inv.id}>
                <td>{inv.id}</td>
                <td>{inv.household}</td>
                <td>{inv.status}</td>

                <td>
                  <button onClick={() => handleAccept(inv.id)}>Accept</button>

                  <button onClick={() => handleDecline(inv.id)}>Decline</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
