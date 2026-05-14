import { useEffect, useState, useCallback } from "react";
import {
  getHouseholds,
  createHousehold,
} from "../../services/householdService";

import { HouseholdContext } from "../context/HouseholdContext";
import { useAuth } from "../hooks/useAuth";

export default function HouseholdProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [households, setHouseholds] = useState([]);
  const [selectedHousehold, setSelectedHousehold] = useState(null);
  const [loading, setLoading] = useState(false);

  // =========================
  // LOAD HOUSEHOLDS
  // =========================

  const loadHouseholds = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getHouseholds();

      const list = Array.isArray(data) ? data : [];

      setHouseholds(list);

      if (!selectedHousehold && list.length > 0) {
        setSelectedHousehold(list[0].id);
      }
    } catch (err) {
      console.error("Failed to load households:", err);
    } finally {
      setLoading(false);
    }
  }, [selectedHousehold]);

  // =========================
  // AUTH CHANGES
  // =========================

  useEffect(() => {
    // LOGOUT
    if (!isAuthenticated) {
      setHouseholds([]);

      setSelectedHousehold(null);

      return;
    }

    // LOGIN
    loadHouseholds();
  }, [isAuthenticated, loadHouseholds]);

  // =========================
  // CREATE HOUSEHOLD
  // =========================

  const createNewHousehold = async () => {
    try {
      const newHousehold = await createHousehold({
        name: "New Household",
      });

      setHouseholds((prev) => [...prev, newHousehold]);

      setSelectedHousehold(newHousehold.id);
    } catch (err) {
      console.error("Create household failed:", err);
    }
  };

  // =========================
  // CURRENT HOUSEHOLD
  // =========================

  const currentHousehold = households.find((h) => h.id === selectedHousehold);

  const isOwner = currentHousehold?.role === "owner";

  // =========================
  // CONTEXT VALUE
  // =========================

  const value = {
    households,

    selectedHousehold,

    setSelectedHousehold,

    refreshHouseholds: loadHouseholds,

    createHousehold: createNewHousehold,

    currentHousehold,

    isOwner,

    loading,
  };

  return (
    <HouseholdContext.Provider value={value}>
      {children}
    </HouseholdContext.Provider>
  );
}
