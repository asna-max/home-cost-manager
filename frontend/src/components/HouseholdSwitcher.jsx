import { useEffect, useState } from "react";
import { getHouseholds } from "../services/api";

export default function HouseholdSwitcher({
  token,
  selectedHousehold,
  setSelectedHousehold,
}) {
  const [households, setHouseholds] = useState([]);

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      const data = await getHouseholds(token);

      if (Array.isArray(data)) {
        setHouseholds(data);

        // 🔥 erstes Household automatisch setzen
        if (data.length > 0 && !selectedHousehold) {
          setSelectedHousehold(data[0].id);
        }
      }
    };

    fetchData();
  }, [token]);

  return (
    <select
      value={selectedHousehold || ""}
      onChange={(e) => setSelectedHousehold(Number(e.target.value))}
      style={{ marginRight: "10px" }}
    >
      {households.map((h) => (
        <option key={h.id} value={h.id}>
          {h.name}
        </option>
      ))}
    </select>
  );
}
