export default function BillsFilters({ filters, setFilters, years }) {
  return (
    <div className="filters">
      <select
        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
      >
        <option value="all">All Types</option>
        <option value="electricity">Electricity</option>
        <option value="water">Water</option>
        <option value="heating">Heating</option>
        <option value="other">Other</option>
      </select>

      <select
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
      >
        <option value="all">All Status</option>
        <option value="paid">Paid</option>
        <option value="unpaid">Unpaid</option>
      </select>

      <select
        onChange={(e) => setFilters({ ...filters, year: e.target.value })}
      >
        <option value="all">All Years</option>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      <button
        onClick={() => setFilters({ type: "all", status: "all", year: "all" })}
      >
        Reset
      </button>
    </div>
  );
}
