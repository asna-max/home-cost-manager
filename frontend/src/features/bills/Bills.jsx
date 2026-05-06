import { useState } from "react";
import { useHousehold } from "../../shared/hooks/useHousehold";
import { useBills } from "./hooks/useBills";
import { getYears, filterBills } from "./utils/billsUtils";

import BillsFilters from "./components/BillFilters";
import BillsTable from "./components/BillsTable";

export default function Bills() {
  const { selectedHousehold } = useHousehold();
  const { bills, loading, removeBill, toggleStatus } =
    useBills(selectedHousehold);

  const [filters, setFilters] = useState({
    type: "all",
    status: "all",
    year: "all",
  });

  const years = getYears(bills);
  const filtered = filterBills(bills, filters);

  return (
    <div>
      {loading && <p>Loading...</p>}

      <BillsFilters filters={filters} setFilters={setFilters} years={years} />

      <BillsTable
        bills={filtered}
        onDelete={removeBill}
        onToggle={toggleStatus}
      />
    </div>
  );
}
