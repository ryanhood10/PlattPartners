// Frontend API client. All dashboard pages call our own /api/* routes through here.
// The contract follows docs/architecture.md: { ok: true, data } or { ok: false, error }.

export type ApiOk<T> = { ok: true; data: T };
export type ApiErr = { ok: false; error: { code: string; message: string } };
export type ApiResponse<T> = ApiOk<T> | ApiErr;

export class ApiError extends Error {
  constructor(public code: string, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    headers: { 'content-type': 'application/json', ...(init?.headers ?? {}) },
    credentials: 'include',
    ...init,
  });
  const body: ApiResponse<T> = await res.json();
  if (!body.ok) throw new ApiError(body.error.code, body.error.message);
  return body.data;
}

export const api = {
  health: () => request<{ version: string; env: string; ts: string }>('/api/health'),
};
