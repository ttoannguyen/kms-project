import app from "./app";
import config from "./config/config";
import { AppDataSource } from "./config/db/data-source";

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected.");
    app.get("/api/health", (req, res) => {
      res.json({ status: "OK" });
    });
    app.listen(config.server.port, () => {
      console.log(
        `Server is running on http://localhost:${config.server.port}${config.server.API_BASE_URL}`
      );
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();
