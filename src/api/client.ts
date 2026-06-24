import { getToken } from "../auth/tokenStorage";

const API_BASE_URL = "http://localhost:3000";

type ApiOptions = RequestInit & {
  auth?: boolean;
};

export async function apiFetch(path: string, options: ApiOptions = {}) {
  const useAuth = options.auth !== false;
  const token = useAuth ? await getToken() : null;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw buildApiError(response, data);
  }

  return data;
}

function buildApiError(response: Response, data: any) {
  return {
    status: response.status,
    code: data?.error?.code || "request_failed",
    message: data?.error?.message || response.statusText || "Request failed.",
    details: data?.error?.details || null,
  };
}