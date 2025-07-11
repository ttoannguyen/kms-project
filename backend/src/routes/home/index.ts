// src/routes/home/index.ts
import { Router } from "express";
import * as homeConfigController from "../../controllers/home/home.controller";
import { authMiddleware } from "../../middleware/authJwt";

const router = Router();

router.get("/", homeConfigController.getHomeConfig);
router.put("/:id", authMiddleware, homeConfigController.updateHomeConfig);
router.post("/",authMiddleware, homeConfigController.createHomeConfig);

export default router;
