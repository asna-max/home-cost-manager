import { useEffect, useState } from "react";
import { getBills, updateBill, BASE_URL, deleteBill } from "../services/api";
import { FaEye, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

export default function Bills({ token, selectedHousehold }) {
  const [bills, setBills] = useState([]);

  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");

  // LOAD DATA
  useEffect(() => {
    if (!token || !selectedHousehold) return;

    const fetchBills = async () => {
      const data = await getBills(token, selectedHousehold);
      setBills(Array.isArray(data) ? data : []);
    };

    fetchBills();
  }, [token, selectedHousehold]);

  // DELETE
  const handleDelete = async (id) => {
    await deleteBill(token, id);
    setBills((prev) => prev.filter((b) => b.id !== id));
  };

  // TOGGLE STATUS
  const handleToggleStatus = async (bill) => {
    const response = await updateBill(token, bill.id, {
      is_paid: !bill.is_paid,
    });

    setBills((prev) =>
      prev.map((b) => (b.id === bill.id ? { ...b, ...response } : b)),
    );
  };

  // YEARS (dynamic)
  const years = [
    ...new Set(bills.map((b) => new Date(b.period_from).getFullYear())),
  ].sort((a, b) => b - a);

  // FILTER LOGIC
  const filteredBills = bills.filter((bill) => {
    if (typeFilter !== "all" && bill.bill_type !== typeFilter) return false;
    if (statusFilter === "paid" && !bill.is_paid) return false;
    if (statusFilter === "unpaid" && bill.is_paid) return false;

    if (yearFilter !== "all") {
      const y = new Date(bill.period_from).getFullYear().toString();
      if (y !== yearFilter) return false;
    }

    return true;
  });

  return (
    <div>
      {/* FILTER */}
      <div className="filters">
        <select onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="all">All Types</option>
          <option value="electricity">Electricity</option>
          <option value="water">Water</option>
          <option value="heating">Heating</option>
          <option value="other">Other</option>
        </select>

        <select onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>

        <select onChange={(e) => setYearFilter(e.target.value)}>
          <option value="all">All Years</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            setTypeFilter("all");
            setStatusFilter("all");
            setYearFilter("all");
          }}
        >
          Reset
        </button>
      </div>

      {/* TABLE */}
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th className="col-title">Title</th>
              <th className="col-type">Type</th>
              <th className="col-date">From</th>
              <th className="col-date">To</th>
              <th className="col-date">Due</th>
              <th>Consumption</th>
              <th className="col-amount">Amount</th>
              <th>View</th>
              <th className="status-col">Status</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {filteredBills.map((bill) => (
              <tr key={bill.id}>
                <td className="col-title" title={bill.title}>
                  {bill.title}
                </td>
                <td className="col-type" title={bill.bill_type}>
                  {bill.bill_type}
                </td>
                <td className="col-date">{bill.period_from}</td>
                <td className="col-date">{bill.period_to}</td>
                <td className="col-date">{bill.due_date}</td>
                <td>{bill.consumption}</td>
                <td className="col-amount">{bill.amount}</td>

                {/* View */}
                <td>
                  {bill.file ? (
                    <a
                      href={`${BASE_URL}${bill.file}`}
                      target="_blank"
                      rel="noreferrer"
                      className="icon-btn"
                    >
                      <FaEye />
                    </a>
                  ) : (
                    "-"
                  )}
                </td>

                {/* Status */}
                <td className="status-col">
                  <button
                    className="icon-btn status"
                    onClick={() => handleToggleStatus(bill)}
                  >
                    {bill.is_paid ? <FaCheck /> : <FaTimes />}
                  </button>
                </td>

                {/* Delete */}
                <td>
                  <button
                    className="icon-btn delete"
                    onClick={() => handleDelete(bill.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
