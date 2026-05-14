import api from "../api/axios";
import { ENDPOINTS } from "../api/endpoints";

export async function login(username, password) {
  const response = await api.post(ENDPOINTS.AUTH.LOGIN, {
    username,
    password,
  });

  return response.data;
}

export async function register(data) {
  const response = await api.post(ENDPOINTS.AUTH.REGISTER, data);

  return response.data;
}

