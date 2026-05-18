import { useContext } from "react";

import { SettingsContext } from "../../../shared/context/SettingsContext";

export function useSettings() {
  return useContext(SettingsContext);
}
