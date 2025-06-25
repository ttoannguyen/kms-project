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

// APP
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
