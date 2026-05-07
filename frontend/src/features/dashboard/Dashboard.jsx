import { useHousehold } from "../../shared/hooks/useHousehold";
import { useDashboardData } from "./hooks/useDashboardData";
import SummaryCards from "./components/SummaryCards";
import { buildSummary } from "./utils/dashboardUtils";

export default function Dashboard() {
  const { selectedHousehold } = useHousehold();

  const { loading, bills } = useDashboardData(selectedHousehold);

  if (!selectedHousehold) {
    return (
      <div className="text-center mt-10 text-gray-500">Select household</div>
    );
  }

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-500">Loading dasboard</div>
    );
  }

  const summary = buildSummary(bills);

  return (
    <div className="space-y-6">
      {summary && <SummaryCards summary={summary} />}
    </div>
  );
}
