// src/main.ts
import app from "./app";
import config from "./config/config";
import { AppDataSource } from "./config/db/data-source";
import { loadRuntimeConfig } from "./config/runtimeConfig";
import { initDefaultAppConfigKeys } from "./services/appconfig/initDefaultConfig";

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Connected to Postgres");

    await initDefaultAppConfigKeys();
    await loadRuntimeConfig();
    app.listen(config.server.port, () => {
      console.log(`Server running on http://localhost:${config.server.port}`);
    });
  } catch (err) {
    console.error("Error during server startup:", err);
    process.exit(1);
  }
};

startServer();
