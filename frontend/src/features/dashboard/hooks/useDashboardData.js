import { useEffect, useState } from "react";
import { getBills } from "../../../services/billService";

export function useDashboardData(selectedHousehold) {
  const [loading, setLoading] = useState(false);

  const [bills, setBills] = useState([]);

  useEffect(() => {
    if (!selectedHousehold) return;

    const fetchDashboard = async () => {
      setLoading(true);

      try {
        const result = await getBills(selectedHousehold);

        setBills(Array.isArray(result) ? result : []);
        console.log("Dashboard bills:", result);
      } catch (err) {
        console.error("Dashboard loading faild", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [selectedHousehold]);

  return {
    loading,
    bills,
  };
}
