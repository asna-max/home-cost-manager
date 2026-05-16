import { useHousehold } from "../hooks/useHousehold";

import { useNavigate } from "react-router-dom";

export default function HouseholdSwitcher() {
  const {
    households,
    selectedHousehold,
    setSelectedHousehold,
    createHousehold,
  } = useHousehold();

  const navigate = useNavigate();

  // =========================
  // NO HOUSEHOLDS
  // =========================

  if (!households?.length) {
    return (
      <button
        onClick={async () => {
          await createHousehold();

          navigate("/home");
        }}
        className="
          bg-blue-500
          hover:bg-blue-600
          text-white
          px-4
          py-2
          rounded-md
          text-sm
          transition
        "
      >
        + Create Household
      </button>
    );
  }

  // =========================
  // NORMAL SELECT
  // =========================

  return (
    <div className="relative">
      <select
        className="
          appearance-none
          border
          border-gray-300
          dark:border-gray-600
          px-3
          py-2
          pr-8
          rounded-md
          text-sm
          bg-white
          dark:bg-gray-800
          text-gray-800
          dark:text-white
          shadow-sm
          hover:border-gray-400
          dark:hover:border-gray-500
          focus:outline-none
          focus:ring-2
          focus:ring-blue-400
          transition
        "
        value={selectedHousehold || ""}
        onChange={async (e) => {
          const value = e.target.value;

          if (value === "new") {
            await createHousehold();

            navigate("/home");
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

      {/* ARROW */}

      <div
        className="
          pointer-events-none
          absolute
          inset-y-0
          right-2
          flex
          items-center
          text-gray-400
          dark:text-gray-500
          text-xs
        "
      >
        ▼
      </div>
    </div>
  );
}
