import { Router } from "express";

import {
  getAllMetadataBlock,
  getMetadataItem,
} from "../../controllers/metadataBlock/metadataBlock.controller";

const router = Router();

router.get("/getAllMetadataBlock", getAllMetadataBlock);
router.get("/getMetadataItem", getMetadataItem);

export default router;
