import axios from "axios";
import { useSystemStore } from "@/stores/useSystemStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1",
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const { status, data } = err.response || {};
    if (status === 503 && data?.maintenance) {
      console.log("Server in maintenance mode");
      const { setStatus } = useSystemStore.getState();
      setStatus({ maintenance: true, message: data.message || "Server in maintenance mode" });
    }
    return Promise.reject(err);
  }
);

export default api;
