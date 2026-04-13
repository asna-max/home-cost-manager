import { useEffect, useState } from "react";
import { getBills, createBill, deleteBill, updateBill } from "../services/api";

export default function Bills({ token }) {
  const [bills, setBills] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  // LOAD
  useEffect(() => {
    async function fetchBills() {
      const data = await getBills(token, 2); 

      if (Array.isArray(data)) {
        setBills(data);
      } else {
        setBills([]);
      }
    }

    if (token) {
      fetchBills();
    }
  }, [token]);

  // CREATE
  const handleCreate = async () => {
    const newBill = {
      household: 1,
      title,
      bill_type: "electricity",
      amount: parseFloat(amount),
      period_from: "2026-04-01",
      period_to: "2026-04-30",
      due_date: "2026-05-10",
      is_paid: false,
    };

    await createBill(token, newBill);

    const data = await getBills(token, 1);
    if (Array.isArray(data)) {
      setBills(data);
    }

    setTitle("");
    setAmount("");
  };

  // DELETE
  const handleDelete = async (id) => {
    await deleteBill(token, id);

    setBills((prevBills) => prevBills.filter((b) => b.id !== id));
  };

  // UPDATE
  const handleUpdate = async (bill) => {
    const updated = {
      ...bill,
      title: bill.title + " (updated)",
    };

    const response = await updateBill(token, bill.id, updated);

    setBills((prevBills) =>
      prevBills.map((b) => (b.id === bill.id ? response : b))
    );
  };

  return (
    <div>
      <h2>Bills</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button onClick={handleCreate} disabled={!title || !amount}>
          Add Bill
        </button>
      </div>

      <div>
        {Array.isArray(bills) && bills.length > 0 ? (
          bills.map((bill) => (
            <div key={bill.id}>
              {bill.title} - {bill.amount}

              <button onClick={() => handleUpdate(bill)}>
                Update
              </button>

              <button onClick={() => handleDelete(bill.id)}>
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No bills found</p>
        )}
      </div>
    </div>
  );
}