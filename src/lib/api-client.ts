import { getTokenFromStorage } from "@/lib/token-storage";

// const BACKEND_API_URL = process.env.BACKEND_API_URL;

export interface RequestOptions extends RequestInit {
  skipAuth?: boolean;
}

export async function apiRequest<T = unknown>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  const { skipAuth = false, headers = {}, ...restOption } = options;

  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };
  // 기존 headers 병합
  if (headers instanceof Headers) {
    headers.forEach((value, key) => {
      requestHeaders[key] = value;
    });
  } else if (Array.isArray(headers)) {
    headers.forEach(([key, value]) => {
      requestHeaders[key] = value;
    });
  } else if (headers) {
    Object.assign(requestHeaders, headers);
  }

  if (skipAuth) {
    const token = getTokenFromStorage();
    if (token) {
      requestHeaders["authorization"] = `Bearer ${token}`;
    }
  }
  try {
    const response = await fetch(url, {
      ...restOption,
      headers: requestHeaders,
    });
    const contentType = response.headers.get("content-type");
    const isJson = contentType?.includes("application/json");
    if (!response.ok) {
      // 에러 응답 처리
      const errorData = isJson ? await response.json() : await response.text();
      throw new Error(
        errorData?.message ||
          errorData ||
          `HTTP error! status: ${response.status}`
      );
    }
    // JSON 응답 파싱
    if (isJson) {
      return await response.json();
    }
    return (await response.text()) as T;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}
export function apiGet<T = unknown>(
  url: string,
  options?: RequestOptions
): Promise<T> {
  return apiRequest<T>(url, { ...options, method: "GET" });
}

export function apiPost<T = unknown, D = Record<string, unknown>>(
  url: string,
  data?: D,
  options?: RequestOptions
): Promise<T> {
  return apiRequest<T>(url, {
    ...options,
    method: "POST",
    body: data ? JSON.stringify(data) : undefined,
  });
}
