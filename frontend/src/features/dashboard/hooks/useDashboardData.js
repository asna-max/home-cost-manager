import { useEffect, useState } from "react";

import { getBills } from "../../../services/billService";

import {
  buildSummary,
  buildMonthlyData,
  buildDistributionData,
  buildDistributionStats,
} from "../utils/dashboardUtils";

export function useDashboardData(selectedHousehold) {
  const [loading, setLoading] = useState(false);

  const [summary, setSummary] = useState(null);

  const [monthlyData, setMonthlyData] = useState([]);
  const [distributionData, setDistributionData] = useState([]);
  const [distributionStates, setDistributionStates] = useState(null);

  const [bills, setBills] = useState([]);

  useEffect(() => {
    if (!selectedHousehold) return;

    const fetchDashboard = async () => {
      setLoading(true);

      try {
        const bills = await getBills(selectedHousehold);

        // RAW DATA
        setBills(bills);

        // SUMMARY
        setSummary(buildSummary(bills));

        // MONTHLY CHART
        const monthly = buildMonthlyData(bills);
        setMonthlyData(monthly);

        // DISTRIBUTION CHART
        const distribution = buildDistributionData(bills);
        setDistributionData(distribution);

        setDistributionStates(buildDistributionStats(distribution, monthly));
      } catch (err) {
        console.error("Dashboard loading failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [selectedHousehold]);

  return {
    loading,
    bills,
    summary,
    monthlyData,
    distributionData,
    distributionStates,
  };
}
