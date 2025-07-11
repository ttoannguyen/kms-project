//routes/index.ts
import { Router } from "express";
import dataverseRouter from "./dataverse";
import fileRouter from "./file/index";
import datasetRouter from "./dataset/index";
import metadataBlockRouter from "./metadataBlock/index";
import postRouter from "./post/index";
import homeRouter from "./home/index";
import configRouter from "./config/index";
import adminRouter from "./admin/adminLocal.route";
import statusRouter from "./config/status";
const router = Router();

router.use(statusRouter);

router.use("/dataverse", dataverseRouter);
router.use("/dataset", datasetRouter);
router.use("/file", fileRouter);
router.use("/metadataBlock", metadataBlockRouter);
router.use("/post", postRouter);
router.use("/home-config", homeRouter);

//========== (keycloak - admin) ==========//
router.use("/admin", configRouter);

//========== sys/admin ==========//
router.use("/sys/admin", adminRouter);

export default router;
