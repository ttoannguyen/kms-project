import { Router } from "express";
import {
  getDownloadCount,
  getFile,
  getMetadataFile,
} from "../../controllers/file/file.controller";
import multer from "multer";
const upload = multer();

const router = Router();

router.get("/getFile", getFile);
router.get("/getMetadata", getMetadataFile);
router.get("/getDownloadCount", getDownloadCount);
// router.post("/uploadFile", upload.single("file"), uploadFileData);

export default router;
