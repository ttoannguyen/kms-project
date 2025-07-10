// src/context/AuthProvider.tsx
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Keycloak from "keycloak-js";

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
    const keycloak = new Keycloak({
      url: import.meta.env.VITE_KEYCLOAK_URL,
      realm: import.meta.env.VITE_KEYCLOAK_REALM,
      clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
    });

    keycloak
      .init({
        onLoad: "check-sso",
        pkceMethod: "S256",
        silentCheckSsoRedirectUri:
          window.location.origin + "/silent-check-sso.html",
      })
      .then((authenticated) => {
        setClient(keycloak);
        setIsAuthenticated(authenticated);

        const tokenParsed = keycloak.tokenParsed;
        const realmRoles = tokenParsed?.realm_access?.roles || [];
        setRoles(realmRoles);
        setUsername(tokenParsed?.preferred_username);
        setIdToken(keycloak.idToken);
      })
      .catch((err) => {
        console.error("Keycloak init failed", err);
        setIsAuthenticated(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const hasRole = useCallback(
    (role: string) => {
      return roles.includes(role);
    },
    [roles]
  );

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
  
  console.log({
    isAuthenticated,
    isLoading,
    roles,
    username,
    hasRole,
    client,
    idToken,
  });

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return context;
};
