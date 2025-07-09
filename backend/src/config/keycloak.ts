import session from "express-session";
import Keycloak from "keycloak-connect";
import dotenv from "dotenv";
import config from "./config";

dotenv.config();

const memoryStore = new session.MemoryStore();

// 👇 Fix 'clientId' to 'resource'
const keycloak = new Keycloak(
  {
    store: memoryStore,
  },
  {
    realm: config.keycloak.keycloak_realm!,
    "auth-server-url": config.keycloak.keycloak_base_url!,
    resource: config.keycloak.keycloak_client_id!, // ✅ correct name
    "bearer-only": true,
    credentials: {
      secret: process.env.KEYCLOAK_SECRET!,
    },
  }
);

export { keycloak, memoryStore };
