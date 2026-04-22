import { useEffect, useState } from "react";
import { getBills, deleteBill, updateBill } from "../services/api";
import { BASE_URL } from "../services/api";

export default function Bills({ token, selectedHousehold }) {
  const [bills, setBills] = useState([]);
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");

  // Daten laden
  useEffect(() => {
    if (!token || !selectedHousehold) return;

    const fetchBills = async () => {
      const data = await getBills(token, selectedHousehold);

      if (Array.isArray(data)) {
        setBills(data);
      } else {
        setBills([]);
      }
    };

    fetchBills();
  }, [token, selectedHousehold]);

  // Delete
  const handleDelete = async (id) => {
    await deleteBill(token, id);
    setBills((prev) => prev.filter((b) => b.id !== id));
  };

  // Toggle Status (paid/unpaid)
  const handleToggleStatus = async (bill) => {
    const updated = {
      is_paid: !bill.is_paid,
    };

    const response = await updateBill(token, bill.id, updated);
    setBills((prev) =>
      prev.map((b) => (b.id === bill.id ? { ...b, ...response } : b)),
    );
  };

  const filteredBills = bills.filter((bill) => {
    // Type
    if (typeFilter !== "all" && bill.bill_type != typeFilter) {
      return false;
    }

    // Status
    if (statusFilter === "paid" && !bill.is_paid) return false;
    if (statusFilter === "unpaid" && bill.is_paid) return false;

    // Year
    if (yearFilter !== "all") {
      const billyear = new Date(bill.period_from).getFullYear().toString();
      if (billyear !== yearFilter) return false;
    }

    return true;
  });

  const year = [
    ...new Set(bills.map((b) => new Date(b.period_from).getFullYear())),
  ].sort((a, b) => b - a);

  return (
    <div>
      <h2>Bills</h2>
      <div style={{ marginBottom: "15px" }}>
        {/* TYPE */}
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="electricity">Electricity</option>
          <option value="water">Water</option>
          <option value="heating">Heating</option>
          <option value="other">Other</option>
        </select>
        {/* STATUS */}
        <select
          // value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>

        {/* YEAR */}
        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
        >
          <option value="all">All Years</option>

          {year.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={() => {
          setTypeFilter("all");
          setStatusFilter("all");
          setYearFilter("all");
        }}
      >
        Reset Filters
      </button>
      {filteredBills.length === 0 ? (
        <p>No bills found</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Period From</th>
              <th>Period To</th>
              <th>Due Date</th>
              <th>Consumption</th>
              <th>Amount</th>
              <th>View</th>
              <th>Status</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {filteredBills.map((bill) => (
              <tr key={bill.id}>
                <td>{bill.title}</td>
                <td>{bill.bill_type}</td>
                <td>{bill.period_from}</td>
                <td>{bill.period_to}</td>
                <td>{bill.due_date}</td>
                <td>{bill.consumption}</td>
                <td>{bill.amount}</td>

                {/* View */}
                <td>
                  {bill.file ? (
                    <a
                      href={`${BASE_URL}${bill.file}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View
                    </a>
                  ) : (
                    "No file"
                  )}
                </td>
                {/* Status Toggle */}
                <td>
                  <button onClick={() => handleToggleStatus(bill)}>
                    {bill.is_paid ? "Paid ✅" : "Unpaid ❌"}
                  </button>
                </td>
                {/* Delete */}
                <td>
                  <button onClick={() => handleDelete(bill.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
