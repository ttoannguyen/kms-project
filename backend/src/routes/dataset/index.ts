import { Router } from "express";
import {
  getDataset,
  getDatasetDownloadCount,
  getDatasetForUploadFile,
  getDownloadSize,
} from "../../controllers/dataset/dataset.controller";

const router = Router();

router.get("/getDataset", getDataset);
router.get("/getDatasetDownloadCount", getDatasetDownloadCount);
router.get("/getDownloadSize", getDownloadSize);
router.get("/getDatasetForUploadFile", getDatasetForUploadFile);

export default router;
