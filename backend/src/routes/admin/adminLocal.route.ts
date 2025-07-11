import { Router } from "express";
import * as adminAuthController from "../../controllers/admin/adminAuth.controller";
import { authLocalAdmin } from "../../middleware/authLocalAdmin";
import * as controller from "../../controllers/appconfig/appConfig.controller";
import { authMiddleware } from "../../middleware/authJwt";

const router = Router();

router.post("/login", adminAuthController.login);
router.post("/create", authLocalAdmin, adminAuthController.createAdmin);
router.get("/", authLocalAdmin, adminAuthController.listAdmins);

router.get("/check-keycloak", controller.checkKeycloakConfigured);
router.get("/get-config", controller.getAll);
router.put("/save-config", authLocalAdmin, controller.save);
router.get("/public", controller.getPublic);

export default router;