// src/config/config.ts
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export default {
  server: {
    port: parseInt(requireEnv("PORT")),
    API_BASE_URL: requireEnv("API_BASE_URL"),
  },
  db: {
    type: "postgres" as const,
    host: requireEnv("DB_HOST"),
    port: parseInt(requireEnv("DB_PORT")),
    username: requireEnv("DB_USER"),
    password: requireEnv("DB_PASSWORD"),
    database: requireEnv("DB_NAME"),
    synchronize: requireEnv("DB_SYNC") === "true",
    logging: requireEnv("DB_LOGGING") === "true",
  },
  dataverse: {
    api: requireEnv("DATAVERSE_API_BASE"),
  },
  token: {
    jwt_token: requireEnv("JWT_TOKEN"),
  },
  keycloak: {
    keycloak_base_url: requireEnv("KEYCLOAK_BASE_URL"),
    keycloak_client_id: requireEnv("KEYCLOAK_CLIENT_ID"),
    keycloak_realm: requireEnv("KEYCLOAK_REALM"),
    keycloak_audience: requireEnv("KEYCLOAK_AUDIENCE"),
    keycloak_public_key: requireEnv("KEYCLOAK_PUCLIC_KEY"),
  },
  redis: requireEnv("REDIS_URL"),
  UNPROTECTED_ENDPOINTS: [
    "/auth/login",
    "/auth/refresh",
    "/auth/logout",
    "/users/register",
    "/dataverse/init",
    "/dataverse/dataverse",
    "/dataverse/datasets",
    "/dataverse/count",
    "/dataverse/getdata",
    "/dataset/getDataset",
    "/dataset/getDatasetDownloadCount",
    "/dataset/getDownloadSize",
    "/file/getFile",
    "/file/getMetadata",
    "/file/getDownloadCount",
    "/metadataBlock/getAllMetadataBlock",
    "/metadataBlock/getMetadataItem",
  ],
};
