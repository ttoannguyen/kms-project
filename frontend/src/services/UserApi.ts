import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getCountData = async () => {
  const res = await apiClient.get("/dataverse/count");
  return res.data;
};
