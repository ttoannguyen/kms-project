import session from "express-session";
import Keycloak from "keycloak-connect";
import dotenv from "dotenv";
import config from "./config";

dotenv.config();

const memoryStore = new session.MemoryStore();

const keycloak = new Keycloak(
  {
    store: memoryStore,
  },
  {
    clientId: config.keycloak.keycloak_client_id!,
    bearerOnly: true,
    serverUrl: config.keycloak.keycloak_base_url!,
    realm: config.keycloak.keycloak_realm!,
    credentials: {
      secret: process.env.KEYCLOAK_SECRET!,
    },
  }
);

export { keycloak, memoryStore };
