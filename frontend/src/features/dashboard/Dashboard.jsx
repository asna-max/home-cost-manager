import { useHousehold } from "../../shared/hooks/useHousehold";

export default function Dashboard() {
  const { selectedHousehold } = useHousehold();

  if (!selectedHousehold) {
    return (
      <div className="text-center mt-10 text-gray-500">Select household</div>
    );
  }

  return (
    <div className="spacy-y-6">
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
        <p className="text-gray-500 mt-2">Dashboard content</p>
      </div>
    </div>
  );
}
