import { useHousehold } from "../../shared/hooks/useHousehold";
import { useDashboardData } from "./hooks/useDashboardData";

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

  return (
    <div className="spacy-y-6">
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
        <p className="text-gray-500 mt-2">Bill loaded: {bills.length}</p>
      </div>
    </div>
  );
}
