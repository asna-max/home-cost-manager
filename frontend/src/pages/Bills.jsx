import { useEffect, useState } from "react";
import { getBills, updateBill, deleteBill } from "../services/billService";
import { API_BASE } from "../services/api/apiClient";
import { FaEye, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

export default function Bills({ selectedHousehold }) {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);

  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");

  // =========================
  // LOAD DATA
  // =========================
  useEffect(() => {
    if (!selectedHousehold) return;

    const fetchBills = async () => {
      try {
        setLoading(true);
        const data = await getBills(selectedHousehold);
        setBills(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error loading bills:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, [selectedHousehold]);

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (id) => {
    try {
      await deleteBill(id);

      // lokal entfernen
      setBills((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // =========================
  // TOGGLE STATUS
  // =========================
  const handleToggleStatus = async (bill) => {
    try {
      await updateBill(bill.id, {
        is_paid: !bill.is_paid,
      });

      setBills((prev) =>
        prev.map((b) => (b.id === bill.id ? { ...b, is_paid: !b.is_paid } : b)),
      );
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  // =========================
  // YEARS
  // =========================
  const years = [
    ...new Set(
      bills
        .filter((b) => b.period_from)
        .map((b) => new Date(b.period_from).getFullYear()),
    ),
  ].sort((a, b) => b - a);

  // =========================
  // FILTER LOGIC
  // =========================
  const filteredBills = bills.filter((bill) => {
    if (typeFilter !== "all" && bill.bill_type !== typeFilter) return false;
    if (statusFilter === "paid" && !bill.is_paid) return false;
    if (statusFilter === "unpaid" && bill.is_paid) return false;

    if (yearFilter !== "all" && bill.period_from) {
      const y = new Date(bill.period_from).getFullYear().toString();
      if (y !== yearFilter) return false;
    }

    return true;
  });

  return (
    <div>
      {!selectedHousehold && <p>Select a household first</p>}
      {loading && <p>Loading...</p>}

      {/* ================= FILTER ================= */}
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

      {/* ================= TABLE ================= */}
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Type</th>
              <th>From</th>
              <th>To</th>
              <th>Due</th>
              <th>Amount</th>
              <th>Notes</th>
              <th>View</th>
              <th>Status</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {filteredBills.map((bill) => (
              <tr key={bill.id}>
                <td>{bill.bill_type}</td>
                <td>{bill.period_from}</td>
                <td>{bill.period_to}</td>
                <td>{bill.due_date}</td>
                <td>{bill.amount}</td>
                <td>{bill.notes}</td>

                {/* VIEW */}
                <td>
                  {bill.file ? (
                    <a
                      href={`${API_BASE}${bill.file}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaEye />
                    </a>
                  ) : (
                    "-"
                  )}
                </td>

                {/* STATUS */}
                <td>
                  <button
                    className={` status-btn ${bill.is_paid ? "status-paid" : "status-unpaid"}`}
                    onClick={() => handleToggleStatus(bill)}
                    title={bill.is_paid ? "Paid" : "Unpaid"}
                  >
                    {bill.is_paid ? <FaCheck /> : <FaTimes />}
                  </button>
                </td>

                {/* DELETE */}
                <td>
                  <button onClick={() => handleDelete(bill.id)}>
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
