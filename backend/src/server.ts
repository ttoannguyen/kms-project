// src/main.ts
import app from "./app";
import config from "./config/config";
import { AppDataSource } from "./config/db/data-source";

const startServer = async () => {
  AppDataSource.initialize()
    .then(() => {
      console.log("Connected to Postgres");
      app.listen(config.server.port, () => {
        console.log(`Server running on http://localhost:${config.server.port}`);
      });
    })
    .catch((err) => {
      console.error("Error during Data Source initialization:", err);
    });
};

startServer();
