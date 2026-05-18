import { useTheme } from "../../../shared/hooks/useTheme";

export function useSettings() {
  const { darkMode, setDarkMode } = useTheme();

  return {
    darkMode,
    setDarkMode,
  };
}
