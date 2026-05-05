import React from "react";

export default function HouseholdSwitcher({
  households,
  selectedHousehold,
  setSelectedHousehold,
  onCreateHousehold,
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
      onChange={(e) => {
        const value = e.target.value;

        if (value === "new") {
          onCreateHousehold();
        } else {
          setSelectedHousehold(Number(value));
        }
      }}
    >
      {households.map((household) => (
        <option key={household.id} value={household.id}>
          {household.name}
        </option>
      ))}

      <option value="new">+ New Household</option>
    </select>
  );
}
