import { useNavigate } from "react-router-dom";
import { useHomeProfile } from "./hooks/useHomeProfile";
import { useHousehold } from "../../shared/hooks/useHousehold";

import HomeForm from "./components/HomeForm";
import HomeActions from "./components/HomeActions";

export default function HomeProfile() {
  const navigate = useNavigate();

  const {
    selectedHousehold,
    refreshHouseholds,
    setSelectedHousehold,
    isOwner,
  } = useHousehold();

  const state = useHomeProfile(
    selectedHousehold,
    refreshHouseholds,
    setSelectedHousehold,
    navigate,
  );

  if (!selectedHousehold)
    return (
      <div className="text-center mt-10 text-gray-500">Select household</div>
    );

  if (state.loading)
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Home Profile</h2>

      <HomeForm {...state} />
      <HomeActions {...state} isOwner={isOwner} />
    </div>
  );
}
