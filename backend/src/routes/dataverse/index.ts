import { getCounts } from "../../controllers/dataverse/dataverse.controller";
import { Router } from "express";
import { getData } from "../../controllers/dataverse/dataverse.controller";
const router = Router();

router.use("/count", getCounts);

router.use("/getdata", getData);
export default router;
