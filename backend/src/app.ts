import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import appRouter from "./routes";
import config from "./config/config";
import { errorMiddleware } from "./middleware/errorMiddleware";
import { authMiddleware } from "./middleware/authMiddleware";
import dotenv from "dotenv";
import path from "path";
const APP_API_BASE_URL = config.server.API_BASE_URL;

import {
  ApiConfig,
  getAllFacetableMetadataFields,
} from "@iqss/dataverse-client-javascript";

// Cấu hình mà không dùng token

// APP
// import { configureApi } from "@iqss/dataverse-client-javascript";
import { DataverseApiAuthMechanism } from "@iqss/dataverse-client-javascript/dist/core/infra/repositories/ApiConfig";

// Cấu hình mà không dùng token
ApiConfig.init(
  "https://demo.dataverse.org/api",
  DataverseApiAuthMechanism.API_KEY,
  "537aa531-aa46-421c-a444-4aed6c2f0b89"
);

const app = express();
dotenv.config({ path: path.resolve(__dirname, "../.env") });
// console.log("DATAVERSE_API_BASE:", process.env.DATAVERSE_BASE_URL);
// console.log("DATAVERSE_API_BASE:", path.resolve(__dirname, "../.env"));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(authMiddleware);

app.use(APP_API_BASE_URL, appRouter);
app.use(errorMiddleware);

export default app;
