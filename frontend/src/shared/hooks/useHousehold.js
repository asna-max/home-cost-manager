import { useContext } from "react";
import { HouseholdContext } from "../context/HouseholdContext";

/**
 * Custom Hook für Household State
 * Nutzung:
 * const { households, selectedHousehold, ... } = useHousehold();
 */
export const useHousehold = () => {
  const context = useContext(HouseholdContext);

  if (!context) {
    throw new Error(
      "useHousehold must be used within a HouseholdProvider",
    );
  }

  return context;
};