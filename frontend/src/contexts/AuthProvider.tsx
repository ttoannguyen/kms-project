/* eslint-disable @typescript-eslint/no-explicit-any */
// src/contexts/AuthProvider.tsx
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Keycloak from "keycloak-js";
import api from "@/lib/axios";

type TokenPayload = {
  preferred_username?: string;
  realm_access?: { roles: string[] };
};

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  username?: string;
  roles: string[];
  hasRole: (role: string) => boolean;
  client: Keycloak | null;
  idToken?: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [client, setClient] = useState<Keycloak | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [roles, setRoles] = useState<string[]>([]);
  const [username, setUsername] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [idToken, setIdToken] = useState<string | undefined>();

  useEffect(() => {
    const initKeycloak = async () => {
      try {
        const res = await api.get("/admin/get-config");
        const rawConfig = res.data;

        const config: Record<string, string> = rawConfig.reduce(
          (acc: Record<string, string>, curr: any) => {
            acc[curr.key] = curr.value;
            return acc;
          },
          {}
        );

        console.log(config);
        console.log("keycloak client_id", config["keycloak_client_id"]);

        const hasValidKeycloakConfig =
          config["keycloak_base_url"] &&
          config["keycloak_realm"] &&
          config["keycloak_audience"];

        if (!hasValidKeycloakConfig) {
          setIsLoading(false);
          return;
        }

        const keycloak = new Keycloak({
          url: config["keycloak_base_url"],
          realm: config["keycloak_realm"],
          clientId: config["keycloak_audience"],
        });

        const authenticated = await keycloak.init({
          onLoad: "check-sso",
          pkceMethod: "S256",
          silentCheckSsoRedirectUri:
            window.location.origin + "/silent-check-sso.html",
        });

        setClient(keycloak);
        setIsAuthenticated(authenticated);

        if (authenticated && keycloak.tokenParsed) {
          const tokenParsed = keycloak.tokenParsed as TokenPayload;
          setRoles(tokenParsed.realm_access?.roles || []);
          setUsername(tokenParsed.preferred_username);
          setIdToken(keycloak.idToken);
        }
      } catch (err) {
        console.error("Keycloak init failed", err);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    initKeycloak();
  }, []);

  const hasRole = useCallback((role: string) => roles.includes(role), [roles]);

  const value: AuthContextType = useMemo(
    () => ({
      isAuthenticated,
      isLoading,
      roles,
      username,
      hasRole,
      client,
      idToken,
    }),
    [isAuthenticated, isLoading, roles, username, hasRole, client, idToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside <AuthProvider>");
  return context;
};
