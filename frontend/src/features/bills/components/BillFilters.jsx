export default function BillsFilters({ filters, setFilters, years }) {
  return (
    <div className="flex flex-wrap gap-3 mb-5">
      {/* TYPE */}
      <select
        className="px-3 py-2 border rounded-md text-sm bg-white"
        value={filters.type}
        onChange={(e) =>
          setFilters({ ...filters, type: e.target.value })
        }
      >
        <option value="all">All Types</option>
        <option value="electricity">Electricity</option>
        <option value="water">Water</option>
        <option value="heating">Heating</option>
        <option value="other">Other</option>
      </select>

      {/* STATUS */}
      <select
        className="px-3 py-2 border rounded-md text-sm bg-white"
        value={filters.status}
        onChange={(e) =>
          setFilters({ ...filters, status: e.target.value })
        }
      >
        <option value="all">All Status</option>
        <option value="paid">Paid</option>
        <option value="unpaid">Unpaid</option>
      </select>

      {/* YEAR */}
      <select
        className="px-3 py-2 border rounded-md text-sm bg-white"
        value={filters.year}
        onChange={(e) =>
          setFilters({ ...filters, year: e.target.value })
        }
      >
        <option value="all">All Years</option>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      {/* RESET */}
      <button
        onClick={() =>
          setFilters({ type: "all", status: "all", year: "all" })
        }
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm"
      >
        Reset
      </button>
    </div>
  );
}