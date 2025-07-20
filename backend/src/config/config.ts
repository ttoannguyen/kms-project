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

// Danh sách các key trong DB config (runtime)
export const AppConfigKeys = {
  MAINTENANCE_MODE: "maintenance_mode",
  SITE_NAME: "site_name",

  KEYCLOAK_BASE_URL: "keycloak_base_url",
  KEYCLOAK_REALM: "keycloak_realm",
  KEYCLOAK_CLIENT_ID: "keycloak_client_id",
  KEYCLOAK_AUDIENCE: "keycloak_audience",
  KEYCLOAK_SECRET: "keycloak_secret",
  KEYCLOAK_PUBLIC_KEY: "keycloak_public_key",

  DATAVERSE_API_BASE: "dataverse_api_base",
};

export default {
  // Các cấu hình lấy từ env
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
    synchronize: true,
    logging: requireEnv("DB_LOGGING") === "true",
  },

  // Những phần dưới sẽ được load từ DB, nhưng fallback env vẫn dùng được nếu cần
  dataverse: {
    api: process.env.DATAVERSE_API_BASE || "", // fallback (không bắt buộc)
  },

  token: {
    jwt_token: requireEnv("JWT_TOKEN"),
  },

  keycloak: {
    keycloak_base_url: process.env.KEYCLOAK_BASE_URL || "",
    keycloak_client_id: process.env.KEYCLOAK_CLIENT_ID || "",
    keycloak_realm: process.env.KEYCLOAK_REALM || "",
    keycloak_audience: process.env.KEYCLOAK_AUDIENCE || "",
    keycloak_public_key: process.env.KEYCLOAK_PUBLIC_KEY || "",
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
    "/dataset/getDatasetForUploadFile",
    "/file/getFile",
    "/file/getMetadata",
    "/file/getDownloadCount",
    "/file//uploadFile",
    "/metadataBlock/getAllMetadataBlock",
    "/metadataBlock/getMetadataItem",
    "/admin/check-keycloak",
    "/admin/get-config",
  ],
};
