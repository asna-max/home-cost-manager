const API_BASE = "http://127.0.0.1:8000/api";

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
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
}
