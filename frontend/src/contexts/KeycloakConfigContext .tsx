// src/contexts/KeycloakConfigContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/axios";

type KeycloakConfigContextType = {
  isConfig: boolean;
  loading: boolean;
};

const KeycloakConfigContext = createContext<KeycloakConfigContextType>({
  isConfig: false,
  loading: true,
});

export const KeycloakConfigProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isConfig, setIsConfig] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await api.get("/admin/check-keycloak");
        const config = res.data.keycloakConfigured;

        console.log(res.data.keycloakConfigured);
        setIsConfig(config);
      } catch (err) {
        console.error("Failed to load Keycloak config", err);
        setIsConfig(false);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return (
    <KeycloakConfigContext.Provider value={{ isConfig, loading }}>
      {children}
    </KeycloakConfigContext.Provider>
  );
};

export const useKeycloakConfig = () => {
  return useContext(KeycloakConfigContext);
};
