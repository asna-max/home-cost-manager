// =========================
// STORAGE KEYS
// =========================

const ACCESS_TOKEN_KEY = "access_token";

const REFRESH_TOKEN_KEY = "refresh_token";

// =========================
// MEMORY CACHE
// =========================

let accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

let refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

// =========================
// SET TOKENS
// =========================

export function setTokens(newAccessToken, newRefreshToken) {
  accessToken = newAccessToken;

  refreshToken = newRefreshToken;

  localStorage.setItem(ACCESS_TOKEN_KEY, newAccessToken);

  localStorage.setItem(REFRESH_TOKEN_KEY, newRefreshToken);
}

// =========================
// ACCESS TOKEN
// =========================

export function getAccessToken() {
  return accessToken;
}

// =========================
// REFRESH TOKEN
// =========================

export function getRefreshToken() {
  return refreshToken;
}

// =========================
// CLEAR TOKENS
// =========================

export function clearTokens() {
  accessToken = null;

  refreshToken = null;

  localStorage.removeItem(ACCESS_TOKEN_KEY);

  localStorage.removeItem(REFRESH_TOKEN_KEY);
}
