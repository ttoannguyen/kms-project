// src/services/system/checkMaintenanceStatus.ts
import axios from "axios";

export interface MaintenanceStatus {
  maintenance: boolean;
  message: string;
}

export const checkMaintenanceStatus = async (): Promise<MaintenanceStatus> => {
  try {
    const res = await axios.get<MaintenanceStatus>(
      `${import.meta.env.VITE_API_BASE_URL}/status/maintenance`
    );
    return res.data;
  } catch (err) {
    console.error("Failed to check maintenance status", err);
    return {
      maintenance: false,
      message: "Failed to fetch maintenance status.",
    };
  }
};
