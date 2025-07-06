import { authMiddleware } from "./../middleware/authJwt";
import { Router } from "express";
import dataverseRouter from "./dataverse";
// import dataverseItem from "./dataverseItem";
import fileRouter from "./file/index";
import datasetRouter from "./dataset/index";
import metadataBlockRouter from "./metadataBlock/index";
import postRouter from "./post/index";
const router = Router();

router.use("/dataverse", dataverseRouter);
router.use("/dataset", datasetRouter);
router.use("/file", fileRouter);
router.use("/metadataBlock", metadataBlockRouter);
router.use("/post", postRouter);
export default router;
