// services/getAdminConfig.ts
import api from "@/lib/axios";
import type { ConfigItem } from "@/types/Config/config";

export const useAdminConfigApi = () => {
   

  const getAllConfigs = async () => {
    try {
      const token = await localStorage.getItem("sys_token");
      const res = await api.get("/sys/admin/get-config", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      console.error("Failed to fetch admin config:", err);
      return [];
    }
  };

  const saveConfigs = async (configs: ConfigItem[]) => {
    const token = localStorage.getItem("sys_token");
    const res = await api.put("/sys/admin/save-config", configs, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  };

  return { getAllConfigs, saveConfigs };
};
