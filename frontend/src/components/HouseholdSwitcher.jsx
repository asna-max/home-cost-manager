import { useEffect, useState } from "react";
import { getHouseholds } from "../services/householdService";

export default function HouseholdSwitcher({
  selectedHousehold,
  setSelectedHousehold,
}) {
  const [households, setHouseholds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHouseholds();

        console.log("Households:", data);

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

    fetchData();
  }, [selectedHousehold]);

  return (
    <select
      className="household-select"
      value={selectedHousehold || ""}
      onChange={(e) => setSelectedHousehold(Number(e.target.value))}
    >
      {households.map((h) => (
        <option key={h.id} value={h.id}>
          {h.name}
        </option>
      ))}
    </select>
  );
}
