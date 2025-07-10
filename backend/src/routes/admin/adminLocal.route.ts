import { Router } from "express";
import * as adminAuthController from "../../controllers/admin/adminAuth.controller";
import { authLocalAdmin } from "../../middleware/authLocalAdmin";

const router = Router();

router.post("/login", adminAuthController.login);
router.post("/create", authLocalAdmin, adminAuthController.createAdmin);
router.get("/", authLocalAdmin, adminAuthController.listAdmins);

export default router;