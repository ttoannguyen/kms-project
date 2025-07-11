// src/services/adminLocalAuthService.ts

import api from "@/lib/axios";
const TOKEN_KEY = "sys_token";

export interface LoginResponse {
  token: string;
  user: {
    username: string;
    roles: string[];
  };
}


export async function login(username: string, password: string): Promise<LoginResponse> {
  const res = await api.post("/sys/admin/login", { username, password });
  if (res.status !== 200) {
    throw new Error(res.data?.message || "Login failed");
  }
  const data = res.data as LoginResponse;
  localStorage.setItem(TOKEN_KEY, data.token);
  return data;
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}


export function logout() {
  localStorage.removeItem(TOKEN_KEY);
}


export function isLoggedIn(): boolean {
  return !!getToken();
}
