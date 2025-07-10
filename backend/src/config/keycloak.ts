// src/config/keycloak.ts
import session from "express-session";
import Keycloak from "keycloak-connect";
import { getRuntimeConfig } from "./runtimeConfig";

const memoryStore = new session.MemoryStore();

const runtimeConfig = getRuntimeConfig();

const keycloak = new Keycloak(
  { store: memoryStore },
  {
    realm: runtimeConfig.keycloak_realm,
    "auth-server-url": runtimeConfig.keycloak_base_url,
    resource: runtimeConfig.keycloak_client_id,
    "bearer-only": true,
    credentials: {
      secret: runtimeConfig.keycloak_secret,
    },
  } as any
);

export { keycloak, memoryStore };
