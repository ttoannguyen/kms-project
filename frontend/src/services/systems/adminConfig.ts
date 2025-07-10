// services/getAdminConfig.ts
import api from "@/lib/axios";
import { useAuth } from "@/contexts/AuthProvider";
import type { ConfigItem } from "@/types/Config/config";

export const useAdminConfigApi = () => {
  const { idToken } = useAuth();

  const getAllConfigs = async () => {
    try {
      const res = await api.get("/admin/get-config", {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      return res.data;
    } catch (err) {
      console.error("Failed to fetch admin config:", err);
      return [];
    }
  };

  const saveConfigs = async (configs: ConfigItem[]) => {
    const res = await api.post("/admin/save-config", configs, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    return res.data;
  };

  return { getAllConfigs, saveConfigs };
};
