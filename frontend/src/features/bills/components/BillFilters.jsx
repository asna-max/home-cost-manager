export default function BillsFilters({ filters, setFilters, years }) {
  // =========================
  // STYLES
  // =========================

  const selectClass = `
    w-full
    md:w-auto
    px-3
    py-2
    border
    border-gray-300
    dark:border-gray-700
    rounded-md
    text-sm
    bg-white
    dark:bg-gray-800
    text-gray-700
    dark:text-gray-300
    focus:outline-none
    focus:ring-2
    focus:ring-blue-500
    transition
  `;

  return (
    <div
      className="
        flex
        flex-col
        md:flex-row
        md:flex-wrap
        gap-3
        mb-5
      "
    >
      {/* TYPE */}

      <select
        className={selectClass}
        value={filters.type}
        onChange={(e) =>
          setFilters({
            ...filters,
            type: e.target.value,
          })
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
        className={selectClass}
        value={filters.status}
        onChange={(e) =>
          setFilters({
            ...filters,
            status: e.target.value,
          })
        }
      >
        <option value="all">All Status</option>

        <option value="paid">Paid</option>

        <option value="unpaid">Unpaid</option>
      </select>

      {/* YEAR */}

      <select
        className={selectClass}
        value={filters.year}
        onChange={(e) =>
          setFilters({
            ...filters,
            year: e.target.value,
          })
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
          setFilters({
            type: "all",
            status: "all",
            year: "all",
          })
        }
        className="
          w-full
          md:w-auto
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
        Reset
      </button>
    </div>
  );
}
