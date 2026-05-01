let token = localStorage.getItem("token");

export function setToken(newToken) {
  token = newToken;
  localStorage.setItem("token", newToken);
}

export function getToken() {
  return token;
}

export function clearToken() {
  token = null;
  localStorage.removeItem("token");
}
