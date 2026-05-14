import api from "./api/axios";
import { ENDPOINTS } from "./api/endpoints";

// =========================
// GET HOME PROFILE
// =========================

export async function getHomeProfile(householdId) {
  try {
    const response = await api.get(ENDPOINTS.HOMES.DETAIL(householdId));

    return response.data;
  } catch (err) {
    console.error("Failed to load home profile:", err);

    return null;
  }
}

// =========================
// SAVE HOME PROFILE
// =========================

export async function saveHomeProfile(data, householdId) {
  const response = await api.put(ENDPOINTS.HOMES.DETAIL(householdId), data);

  return response.data;
}
