import { useState } from "react";

import { useHousehold } from "../../shared/hooks/useHousehold";

import { useBills } from "./hooks/useBills";

import { getYears, filterBills } from "./utils/billsUtils";

import BillsFilters from "./components/BillFilters";
import BillsTable from "./components/BillsTable";
import BillsMobileCards from "./components/BillsMobileCards";

export default function Bills() {
  const { selectedHousehold } = useHousehold();

  const { bills, loading, removeBill, toggleStatus } =
    useBills(selectedHousehold);

  // =========================
  // FILTERS
  // =========================

  const [filters, setFilters] = useState({
    type: "all",
    status: "all",
    year: "all",
  });

  const years = getYears(bills);

  const filtered = filterBills(bills, filters);

  // =========================
  // NO HOUSEHOLD
  // =========================

  if (!selectedHousehold) {
    return (
      <div
        className="
          text-center
          mt-10
          text-gray-500
          dark:text-gray-400
        "
      >
        Select household
      </div>
    );
  }

  // =========================
  // PAGE
  // =========================

  return (
    <div className="space-y-6">
      {/* LOADING */}

      {loading && (
        <p
          className="
            text-gray-500
            dark:text-gray-400
          "
        >
          Loading...
        </p>
      )}

      {/* FILTERS */}

      <BillsFilters filters={filters} setFilters={setFilters} years={years} />

      {/* TABLE */}

      {/* MOBILE */}

      <div className="md:hidden">
        <BillsMobileCards
          bills={filtered}
          onDelete={removeBill}
          onToggle={toggleStatus}
        />
      </div>

      {/* DESKTOP */}

      <div className="hidden md:block">
        <BillsTable
          bills={filtered}
          onDelete={removeBill}
          onToggle={toggleStatus}
        />
      </div>
    </div>
  );
}
