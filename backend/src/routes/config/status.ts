// src/routes/status.route.ts 
import { Router } from "express";
import { AppConfigRepository } from "../../repositories/AppConfigRepository";
import { AppDataSource } from "../../config/db/data-source";
import { AppConfigKeys } from "../../config/config";

const router = Router();
const repo = new AppConfigRepository(AppDataSource);

router.get("/status/maintenance", async (_req, res) => {
  try {
    const config = await repo.findOneByKey(AppConfigKeys.MAINTENANCE_MODE);
    const isMaintenance = config?.value === "true";

    res.json({
      maintenance: isMaintenance,
      message: isMaintenance
        ? "The system is under maintenance."
        : "The system is operating normally.",
    });
  } catch (error) {
    console.error("Error getting maintenance status:", error);
    res.status(500).json({
      error: "Failed to retrieve system status.",
    });
  }
});

export default router;
