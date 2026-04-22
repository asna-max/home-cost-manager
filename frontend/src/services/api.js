export const BASE_URL = "http://127.0.0.1:8000";
const API_BASE = `${BASE_URL}/api`;
const BILLS = "bills";
const HOUSE_HOLDS = "households";
const TOKEN = "token";
const INVITE = "invite";
const LIST = "list";
const ACCEPT = "accept";
const DECLINE = "decline";

const POST = "POST";
const DELETE = "DELETE";
const PUT = "PUT";

export async function login(username, password) {
  const response = await fetch(`${API_BASE}/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  return response.json();
}

export async function getBills(token, householdId) {
  const response = await fetch(`${API_BASE}/bills/?household=${householdId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

export async function createBill(token, billData) {
  const response = await fetch(`${API_BASE}/bills/`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(billData),
  });
  return response.json();
}

export async function deleteBill(token, id) {
  await fetch(`${API_BASE}/bills/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function updateBill(token, id, data) {
  const response = await fetch(`${API_BASE}/bills/${id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

// Invitations laden
export async function getInvitations(token) {
  const response = await fetch(`${API_BASE}/households/invite/list/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}

// Accept
export async function acceptInvitation(token, id) {
  const response = await fetch(`${API_BASE}/households/invite/${id}/accept/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}

// Decline
export async function declineInvitation(token, id) {
  const response = await fetch(`${API_BASE}/households/invite/${id}/decline/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}

export async function getHouseholds(token) {
  const response = await fetch(`${API_BASE}/households/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}
