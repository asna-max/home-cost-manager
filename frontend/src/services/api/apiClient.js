import { getToken, clearToken } from "../auth/authStore";

export const API_BASE = "http://127.0.0.1:8000";
const API_URL = `${API_BASE}/api`;

class ApiError extends Error {
  constructor(status, message, data = null) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

export async function apiRequest({
  endpoint,
  method = "GET",
  body = null,
  isFormData = false,
}) {
  const headers = {};

  const token = getToken();

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_URL}/${endpoint}`, {
    method,
    headers,
    body: isFormData ? body : body ? JSON.stringify(body) : null,
  });

  // Auto logout
  if (response.status === 401) {
    clearToken();
    window.dispatchEvent(new Event("unauthorized"));
  }

  let data = null;

  if (response.headers.get("content-type")?.includes("application/json")) {
    data = await response.json();
  }

  if (!response.ok) {
    throw new ApiError(response.status, data?.detail || "API Error", data);
  }

  return data;
}
