// src/app.ts
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import appRouter from "./routes";
import { errorMiddleware } from "./middleware/errorMiddleware";
import { authMiddleware } from "./middleware/authJwt";
import config from "./config/config";

const app = express();

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

// app.use(authMiddleware);
app.use(config.server.API_BASE_URL, appRouter);
app.use(errorMiddleware);

export default app;
