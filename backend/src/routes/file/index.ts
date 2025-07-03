import { Router } from "express";
import {
  getDownloadCount,
  getFile,
  getMetadataFile,
} from "../../controllers/file/file.controller";

const router = Router();

router.get("/getFile", getFile);
router.get("/getMetadata", getMetadataFile);
router.get("/getDownloadCount", getDownloadCount);

export default router;
