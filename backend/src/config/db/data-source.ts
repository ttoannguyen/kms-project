// src/config/db/data-source.ts
import { DataSource } from "typeorm";
import config from "../config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  synchronize: config.db.synchronize,
  logging: config.db.logging ? ["error", "warn"] : false,
  entities: [__dirname + "/../../entities/*.{ts,js}"],
});
