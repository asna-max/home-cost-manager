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
