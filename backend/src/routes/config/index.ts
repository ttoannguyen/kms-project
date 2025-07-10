// src/routes/config/index.ts
import { Router } from "express";
import * as controller from "../../controllers/appconfig/appConfig.controller";
import { authMiddleware } from "../../middleware/authJwt";

const router = Router();

router.get("/check-keycloak",authMiddleware, controller.checkKeycloakConfigured);
router.get("/get-config", authMiddleware, controller.getAll);
router.post("/save-config", authMiddleware, controller.save);


export default router;
