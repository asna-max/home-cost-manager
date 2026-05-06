import { useEffect, useState } from "react";
import {
  getBills,
  updateBill,
  deleteBill,
} from "../../../services/billService";

export function useBills(selectedHousehold) {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedHousehold) return;

    const fetchBills = async () => {
      try {
        setLoading(true);
        const data = await getBills(selectedHousehold);
        setBills(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, [selectedHousehold]);

  const removeBill = async (id) => {
    await deleteBill(id);
    setBills((prev) => prev.filter((b) => b.id !== id));
  };

  const toggleStatus = async (bill) => {
    await updateBill(bill.id, { is_paid: !bill.is_paid });

    setBills((prev) =>
      prev.map((b) => (b.id === bill.id ? { ...b, is_paid: !b.is_paid } : b)),
    );
  };

  return { bills, loading, removeBill, toggleStatus };
}
