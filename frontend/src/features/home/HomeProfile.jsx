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

  // ❗ FIX: warten bis Household geladen ist
  if (!selectedHousehold) return <div>Select household</div>;
  if (state.loading) return <div>Loading...</div>;

  return (
    <div>
      <HomeForm {...state} />
      <HomeActions {...state} isOwner={isOwner} />
    </div>
  );
}
