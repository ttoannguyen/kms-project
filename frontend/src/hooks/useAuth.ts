import Keycloak from "keycloak-js";
import { useEffect, useState, useRef } from "react";

const useAuth = () => {
  const isRun = useRef(false);
  const [token, setToken] = useState<string | undefined>();
  const [isLogin, setLogin] = useState(false);
  const [client, setClient] = useState<Keycloak | null>(null);

  useEffect(() => {
    if (isRun.current) return;
    isRun.current = true;

    const keycloakClient = new Keycloak({
      url: import.meta.env.VITE_KEYCLOAK_URL,
      clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
      realm: import.meta.env.VITE_KEYCLOAK_REALM,
    });

    keycloakClient
      .init({ onLoad: "check-sso" })
      .then((authenticated) => {
        console.log("in useAuth", authenticated);
        setLogin(authenticated);
        setToken(keycloakClient.token);
        setClient(keycloakClient);
        console.log("ID Token:", keycloakClient.idToken); // Kiểm tra idToken
      })
      .catch((error) => {
        console.error("Keycloak initialization failed:", error);
        setLogin(false);
      });

    keycloakClient.onTokenExpired = () => {
      keycloakClient.updateToken(30).then((refreshed) => {
        if (refreshed) {
          setToken(keycloakClient.token);
        }
      });
    };
  }, []);

  return [isLogin, token, client] as const;
};

export default useAuth;
