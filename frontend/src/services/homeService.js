import { apiRequest } from "./api/apiClient";
import { ENDPOINTS } from "./api/endpoints";

// =========================
// GET HOME PROFILE
// =========================
export async function getHomeProfile(householdId) {
  try {
    return await apiRequest({
      endpoint: ENDPOINTS.HOMES.DETAIL(householdId),
    });
  } catch (err) {
    console.error("Failed to load home profile:", err);
    return null;
  }
}

// =========================
// SAVE HOME PROFILE
// =========================
export function saveHomeProfile(data, householdId) {
  return apiRequest({
    endpoint: ENDPOINTS.HOMES.DETAIL(householdId),
    method: "PUT",
    body: data,
  });
}
