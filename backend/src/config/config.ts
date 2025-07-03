// src/config/config.ts
import dotenv from "dotenv";
import path from "path";

// Load env từ gốc dự án
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export default {
  server: {
    port: parseInt(process.env.PORT || "3000", 10),
    API_BASE_URL: process.env.API_BASE_URL || "/api/v1",
  },
  db: {
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432", 10),
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "admin",
    database: process.env.DB_NAME || "postgres",
    synchronize: process.env.DB_SYNC === "true", // use true/false in .env
    logging: process.env.DB_LOGGING === "true",
  },
  redis: process.env.REDIS_URL,
  PUBLIC_ENDPOINTS: [
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
  ],
};
