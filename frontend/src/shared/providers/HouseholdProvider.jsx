import { useEffect, useState, useCallback } from "react";
import {
  getHouseholds,
  createHousehold,
} from "../../services/householdService";
import { HouseholdContext } from "../context/HouseholdContext";


export default function HouseholdProvider({ children }) {
  const [households, setHouseholds] = useState([]);
  const [selectedHousehold, setSelectedHousehold] = useState(null);
  const [loading, setLoading] = useState(false);

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
  }, []);

  useEffect(() => {
    loadHouseholds();
  }, [loadHouseholds]);

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

  const currentHousehold = households.find((h) => h.id === selectedHousehold);

  const isOwner = currentHousehold?.role === "owner";

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
