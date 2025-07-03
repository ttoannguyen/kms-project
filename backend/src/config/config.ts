import dotenv from "dotenv";
dotenv.config();
export default {
  server: {
    port: process.env.PORT || 3000,
    API_BASE_URL: process.env.API_BASE_URL || "/api/v1",
  },
  db: {
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432", 10),
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "admin",
    database: process.env.DB_NAME || "postgres",
    synchronize: process.env.DB_SYNC !== "production", // DEVELOPMENT ONLY
    logging: process.env.DB_LOGGING === "true",
  },
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
  redis: process.env.REDIS_URL,
};
