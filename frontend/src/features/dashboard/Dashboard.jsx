import { useHousehold } from "../../shared/hooks/useHousehold";

import { useDashboardData } from "./hooks/useDashboardData";

import SummaryCards from "./components/SummaryCards";
import MonthlyChart from "./components/MonthlyChart";

export default function Dashboard() {
  const { selectedHousehold } = useHousehold();

  const { loading, summary, monthlyData } = useDashboardData(selectedHousehold);

  // =========================
  // NO HOUSEHOLD
  // =========================
  if (!selectedHousehold) {
    return (
      <div className="text-center mt-10 text-gray-500">Select household</div>
    );
  }

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  // =========================
  // DASHBOARD
  // =========================
  return (
    <div className="space-y-6">
      {/* SUMMARY */}
      {summary && <SummaryCards summary={summary} />}

      {/* MONTHLY CHART */}
      <MonthlyChart data={monthlyData} />
    </div>
  );
}
