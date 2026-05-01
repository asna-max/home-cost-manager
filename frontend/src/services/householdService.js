import { apiRequest } from "./api/apiClient";
import { ENDPOINTS } from "./api/endpoints";

// =========================
// GET HOUSEHOLDS
// =========================
export async function getHouseholds() {
  try {
    const data = await apiRequest({
      endpoint: ENDPOINTS.HOUSEHOLDS.LIST, // ✅ FIX
    });

    return Array.isArray(data)
      ? data
      : Array.isArray(data?.results)
        ? data.results
        : [];
  } catch (err) {
    console.error("Failed to fetch households:", err);
    return [];
  }
}

// =========================
// CREATE HOUSEHOLD
// =========================
export function createHousehold(data) {
  return apiRequest({
    endpoint: ENDPOINTS.HOUSEHOLDS.LIST, // ✅ FIX
    method: "POST",
    body: data,
  });
}

// =========================
// DELETE HOUSEHOLD
// =========================
export function deleteHousehold(id) {
  return apiRequest({
    endpoint: `${ENDPOINTS.HOUSEHOLDS.LIST}${id}`, // ⚠️ kein Slash!
    method: "DELETE",
  });
}
