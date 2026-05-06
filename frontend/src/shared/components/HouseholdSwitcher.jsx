import { useHousehold } from "../hooks/useHousehold";

export default function HouseholdSwitcher() {
  const {
    households,
    selectedHousehold,
    setSelectedHousehold,
    createHousehold,
  } = useHousehold();

  if (!households?.length) {
    return (
      <select
        className="border border-gray-300 bg-gray-100 text-gray-500 px-3 py-2 rounded-md text-sm cursor-not-allowed"
        disabled
      >
        <option>No households</option>
      </select>
    );
  }

  return (
    <div className="relative">
      <select
        className="appearance-none border border-gray-300 px-3 py-2 pr-8 rounded-md text-sm bg-white shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        value={selectedHousehold || ""}
        onChange={(e) => {
          const value = e.target.value;

          if (value === "new") {
            createHousehold();
          } else {
            setSelectedHousehold(Number(value));
          }
        }}
      >
        {households.map((h) => (
          <option key={h.id} value={h.id}>
            {h.name}
          </option>
        ))}

        <option value="new">+ New Household</option>
      </select>

      {/* Dropdown arrow */}
      <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-400 text-xs">
        ▼
      </div>
    </div>
  );
}
