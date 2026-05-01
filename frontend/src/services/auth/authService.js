import { apiRequest } from "../api/apiClient";
import { ENDPOINTS } from "../api/endpoints";

export function login(username, password) {
  return apiRequest({
    endpoint: ENDPOINTS.AUTH.LOGIN,
    method: "POST",
    body: { username, password },
  });
}
