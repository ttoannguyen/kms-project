// src/api/api.ts
import axios from "axios";
// import keycloak from "@/keycloak";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export default api;
