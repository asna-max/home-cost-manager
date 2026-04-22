import { useEffect, useState } from "react";
import { getBills, deleteBill, updateBill } from "../services/api";
import { BASE_URL } from "../services/api";

export default function Bills({ token, selectedHousehold }) {
  const [bills, setBills] = useState([]);

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

  return (
    <div>
      <h2>Bills</h2>

      {bills.length === 0 ? (
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
            {bills.map((bill) => (
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
