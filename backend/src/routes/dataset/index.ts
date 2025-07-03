import { Router } from "express";
import {
  getDataset,
  getDatasetDownloadCount,
  getDownloadSize,
} from "../../controllers/dataset/dataset.controller";

const router = Router();

router.get("/getDataset", getDataset);
router.get("/getDatasetDownloadCount", getDatasetDownloadCount);
router.get("/getDownloadSize", getDownloadSize);

export default router;
