import { apiRequest } from "../api/apiClient";
import { ENDPOINTS } from "../api/endpoints";

export function login(username, password) {
  return apiRequest({
    endpoint: ENDPOINTS.AUTH.LOGIN,
    method: "POST",
    body: { username, password },
  });
}

export async function register(data) {
  return apiRequest({
    endpoint: ENDPOINTS.AUTH.REGISTER,
    method: "POST",
    body: data,
  });
}
