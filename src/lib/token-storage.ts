const TOKEN_KEY = "auth_token";
const REFRESH_TOKEN_KEY = "refresh_token";
export function saveTokenToStorage(token: string, refreshToken: string) {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(TOKEN_KEY, token);
    if (refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
  } catch (error) {
    console.error(error);
  }
}

export function getTokenFromStorage(): string | null {
  if (typeof window === "undefined") return null;

  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function getRefreshTokenFromStorage() {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function removeTokenFromStorage() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  } catch (error) {
    console.error(error);
  }
}
