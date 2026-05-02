import React from "react";

export default function HouseholdSwitcher({
  households,
  selectedHousehold,
  setSelectedHousehold,
}) {
  if (!households || households.length === 0) {
    return (
      <select className="household-select" disabled>
        <option>No households</option>
      </select>
    );
  }

  return (
    <select
      className="household-select"
      value={selectedHousehold || ""}
      onChange={(e) => setSelectedHousehold(Number(e.target.value))}
    >
      {households.map((household) => (
        <option key={household.id} value={household.id}>
          {household.name}
        </option>
      ))}
    </select>
  );
}
