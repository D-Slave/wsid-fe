const BACKEND_API_URL =
  process.env.NEXT_PUBLICK_BACKEND_API_URL ||
  process.env.BACKEND_API_URL ||
  "http://localhost:8080";

export interface BackendResponse<T> {
  code: string;
  message?: string;
  data: T;
}
export interface LoginRequest {
  email: string;
  password: string;
}
export interface SocialLoginRequest {
  email: string;
  name?: string;
  provider: "naver" | "kakao" | "google";
  providerAccountId: string;
  accessToken: string;
  refreshToken?: string;
  image?: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name?: string;
  };
  token: string;
  refreshToken?: string;
}

export async function emailLogin(data: LoginRequest) {
  const url = `${BACKEND_API_URL}/api/v1/user/login`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: "로그인 실패",
      }));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error();
  }
}

export async function socialLogin(data: SocialLoginRequest) {
  const url = `${BACKEND_API_URL}/api/v1/user/social-login`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: "소셜 로그인 실패",
      }));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }
    return await response.json();
  } catch (e) {
    console.error(e);
  }
}
