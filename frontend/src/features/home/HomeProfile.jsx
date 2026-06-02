import { useNavigate } from "react-router-dom";

import { useHomeProfile } from "./hooks/useHomeProfile";

import { useHousehold } from "../../shared/hooks/useHousehold";

import AppCard from "../../shared/components/AppCard";

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

  // =========================
  // NO HOUSEHOLD
  // =========================

  if (!selectedHousehold) {
    return (
      <div
        className="
          text-center
          mt-10
          text-gray-500
          dark:text-gray-400
        "
      >
        Select household
      </div>
    );
  }

  // =========================
  // LOADING
  // =========================

  if (state.loading) {
    return (
      <div
        className="
          text-center
          mt-10
          text-gray-500
          dark:text-gray-400
        "
      >
        Loading...
      </div>
    );
  }

  // =========================
  // PAGE
  // =========================

  return (
    <div className="max-w-4xl mx-auto">
      <AppCard>
        {/* TITLE */}

        <h2
          className="
            text-2xl
            font-semibold
            text-gray-800
            dark:text-white
            mb-8
          "
        >
          Home Profile
        </h2>

        {/* FORM */}

        <HomeForm {...state} {...state} isOwner={isOwner} />

        {/* ACTIONS */}
        {isOwner && <HomeActions {...state} isOwner={isOwner} />}
      </AppCard>
    </div>
  );
}
