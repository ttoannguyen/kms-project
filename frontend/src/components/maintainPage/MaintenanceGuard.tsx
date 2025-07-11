import { useEffect, useState } from "react";
import MaintenancePage from "./MaintenancePage";
import { checkMaintenanceStatus } from "@/services/systems/checkMaintenanceStatus";
import Layout from "@/pages/Layout";
import { useSystemStore } from "@/stores/useSystemStore";
import { useAuth } from "@/contexts/AuthProvider";

const MaintenanceGuard = () => {
  const [loading, setLoading] = useState(true);
  const { hasRole } = useAuth();
  const setStatus = useSystemStore((state) => state.setStatus);
  const maintenance = useSystemStore((state) => state.maintenance);
  const message = useSystemStore((state) => state.message);

  useEffect(() => {
    checkMaintenanceStatus().then((status) => {
      setStatus(status);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="p-4 text-center">Checking system status...</div>;
  }

  if (maintenance && !hasRole("kms_admin")) {
    return <MaintenancePage message={message} />;
  }

  return <Layout />;
};

export default MaintenanceGuard;
