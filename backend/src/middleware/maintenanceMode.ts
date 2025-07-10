// src/middleware/maintenanceMode.ts
import { Request, Response, NextFunction } from "express";
import { getPublicConfig } from "../services/appconfig/appConfig.service";
import { AppConfigKeys } from "../config/config";

export const maintenanceModeMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  getPublicConfig()
    .then((config) => {
      const maintenance = config[AppConfigKeys.MAINTENANCE_MODE] === true;

      const allowList = [
        "/api/v1/status/maintenance",
        "/api/v1/sys/admin/login",
        "/api/v1/sys/admin/check-keycloak",
        "/api/v1/sys/admin/get-config",
        "/api/v1/sys/admin/save-config"
      ];

      const isAllowed = allowList.some((path) =>
        req.originalUrl.startsWith(path)
      );

      console.log("in maintaince mode",maintenance);
      console.log("in maintaince mode",config);

      if (maintenance && !isAllowed) {
        return res.status(503).json({
          maintenance: true,
          message:
            "The system is currently under maintenance. Please try again later.",
        });
      }

      next();
    })
    .catch((error) => {
      console.error("Failed in maintenance middleware:", error);
      next(); // fallback if something fails
    });
};
