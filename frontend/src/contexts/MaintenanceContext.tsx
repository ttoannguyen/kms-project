// src/context/MaintenanceContext.tsx
import { createContext, useState, useContext } from "react";

const MaintenanceContext = createContext<{
  isMaintenance: boolean;
  setMaintenance: (v: boolean) => void;
}>({ isMaintenance: false, setMaintenance: () => {} });

// eslint-disable-next-line react-refresh/only-export-components
export const useMaintenance = () => useContext(MaintenanceContext);

export const MaintenanceProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMaintenance, setIsMaintenance] = useState(false);

  return (
    <MaintenanceContext.Provider
      value={{ isMaintenance, setMaintenance: setIsMaintenance }}
    >
      {children}
    </MaintenanceContext.Provider>
  );
};
