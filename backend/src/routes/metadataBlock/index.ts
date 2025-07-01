import { Router } from "express";

import { getAllMetadataBlock } from "../../controllers/metadataBlock/metadataBlock.controller";

const router = Router();

router.get("/getAllMetadataBlock", getAllMetadataBlock);

export default router;
