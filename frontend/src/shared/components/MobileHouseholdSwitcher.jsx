import { useState } from "react";

export default function MobileHouseholdSwitcher({
  households,
  selectedHousehold,
  setSelectedHousehold,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* BUTTON */}

      <button
        onClick={() => setOpen(!open)}
        className="
          flex
          items-center
          gap-2
          px-3
          py-2
          rounded-lg
          bg-gray-100
          dark:bg-gray-700
          text-sm
          text-gray-700
          dark:text-gray-200
        "
      >
        <span
          className="
            max-w-[90px]
            truncate
          "
        >
          {households.find((h) => h.id === selectedHousehold)?.name ||
            "Household"}
        </span>
      </button>

      {/* DROPDOWN */}

      {open && (
        <div
          className="
            absolute
            right-0
            mt-2
            w-52
            bg-white
            dark:bg-gray-800
            rounded-xl
            shadow-lg
            border
            border-gray-200
            dark:border-gray-700
            z-50
            overflow-hidden
          "
        >
          {households.map((household) => {
            const isActive = selectedHousehold === household.id;

            return (
              <button
                key={household.id}
                onClick={() => {
                  setSelectedHousehold(household.id);

                  setOpen(false);
                }}
                className={`
                    w-full
                    text-left
                    px-4
                    py-3
                    text-sm
                    transition
                    ${
                      isActive
                        ? `
                          bg-blue-500
                          text-white
                        `
                        : `
                          text-gray-700
                          dark:text-gray-200
                          hover:bg-gray-100
                          dark:hover:bg-gray-700
                        `
                    }
                  `}
              >
                {household.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
