// src/contexts/SysAuthContext.tsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";

type SysTokenPayload = {
  username?: string;
  isAdmin?: boolean;
  exp?: number;
};

type SysAuthContextType = {
  isSysAuthenticated: boolean;
  sysUsername?: string;
  logoutSys: () => void;
};

const SysAuthContext = createContext<SysAuthContextType | undefined>(undefined);

export const SysAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSysAuthenticated, setIsSysAuthenticated] = useState(false);
  const [sysUsername, setSysUsername] = useState<string>();

  useEffect(() => {
    const token = localStorage.getItem("sys_token");

    if (!token) {
      setIsSysAuthenticated(false);
      setSysUsername(undefined);
      return;
    }

    try {
      const decoded = jwtDecode<SysTokenPayload>(token);
      const now = Date.now() / 1000;

      if (decoded.exp && decoded.exp < now) {
        localStorage.removeItem("sys_token");
        setIsSysAuthenticated(false);
        setSysUsername(undefined);
      } else {
        setIsSysAuthenticated(true);
        setSysUsername(decoded.username || "sysadmin");
      }
    } catch {
      localStorage.removeItem("sys_token");
      setIsSysAuthenticated(false);
      setSysUsername(undefined);
    }
  }, []);

  const logoutSys = () => {
    localStorage.removeItem("sys_token");
    setIsSysAuthenticated(false);
    setSysUsername(undefined);
  };

  const value = useMemo(
    () => ({
      isSysAuthenticated,
      sysUsername,
      logoutSys,
    }),
    [isSysAuthenticated, sysUsername]
  );

  console.log({
      isSysAuthenticated,
      sysUsername,
      logoutSys,
    })

  return (
    <SysAuthContext.Provider value={value}>
      {children}
    </SysAuthContext.Provider>
  );
};

export const useSysAuth = (): SysAuthContextType => {
  const context = useContext(SysAuthContext);
  if (!context) throw new Error("useSysAuth must be used inside <SysAuthProvider>");
  return context;
};
