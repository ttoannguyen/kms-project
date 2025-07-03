// routes/dataserves/index.ts
import { getCounts } from "../../controllers/dataverse/dataverse.controller";
import { Router } from "express";
import { getData } from "../../controllers/dataverse/dataverse.controller";
const router = Router();

router.get("/count", getCounts);
router.post("/getdata", getData);
export default router;
