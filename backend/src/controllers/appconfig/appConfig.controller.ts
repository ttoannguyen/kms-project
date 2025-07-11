import { Request, Response, NextFunction } from "express";
import * as configService from "../../services/appconfig/appConfig.service";
import { AppConfigKeys } from "../../config/config";

export const checkKeycloakConfigured = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const config = await configService.getKeycloakConfig();

    const isConfigured =
      config[AppConfigKeys.KEYCLOAK_BASE_URL] &&
      config[AppConfigKeys.KEYCLOAK_REALM] &&
      config[AppConfigKeys.KEYCLOAK_AUDIENCE];

    res.json({ keycloakConfigured: !!isConfigured });
  } catch (err) {
    next(err);
  }
};

export const getPublic = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await configService.getPublicConfig();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await configService.getAll();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const save = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;

    if (!Array.isArray(data)) {
       res.status(400).json({ error: "Invalid payload format" });
        return;
    }

    await configService.saveConfig(data);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
