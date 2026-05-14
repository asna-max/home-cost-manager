import api from "./api/axios";

import { ENDPOINTS } from "./api/endpoints";

// =========================
// GET HOUSEHOLDS
// =========================

export async function getHouseholds() {
  try {
    const response = await api.get(ENDPOINTS.HOUSEHOLDS.LIST);

    const data = response.data;

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

export async function createHousehold(data) {
  const response = await api.post(ENDPOINTS.HOUSEHOLDS.LIST, data);

  return response.data;
}

// =========================
// UPDATE HOUSEHOLD NAME
// =========================

export async function updateHouseholdName(id, name) {
  const response = await api.patch(`${ENDPOINTS.HOUSEHOLDS.LIST}${id}/`, {
    name,
  });

  return response.data;
}

// =========================
// DELETE HOUSEHOLD
// =========================

export async function deleteHousehold(id) {
  await api.delete(`${ENDPOINTS.HOUSEHOLDS.LIST}${id}/`);
}
