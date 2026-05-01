import { apiRequest } from "./api/apiClient";
import { ENDPOINTS } from "./api/endpoints";

// =========================
// GET INVITATIONS
// =========================
export async function getInvitations() {
  try {
    const data = await apiRequest({
      endpoint: ENDPOINTS.HOUSEHOLDS.INVITE_LIST,
    });

    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Failed to fetch invitations:", err);
    return [];
  }
}

// =========================
// ACCEPT INVITATION
// =========================
export function acceptInvitation(id) {
  return apiRequest({
    endpoint: ENDPOINTS.HOUSEHOLDS.ACCEPT(id),
    method: "POST",
  });
}

// =========================
// DECLINE INVITATION
// =========================
export function declineInvitation(id) {
  return apiRequest({
    endpoint: ENDPOINTS.HOUSEHOLDS.DECLINE(id),
    method: "POST",
  });
}
