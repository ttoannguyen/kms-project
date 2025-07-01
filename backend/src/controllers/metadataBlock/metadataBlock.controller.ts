import { Request, Response } from "express";
import * as metadataBlockService from "../../services/metadataBlock/metadataBlock.service";

export const getAllMetadataBlock = async (_req: Request, res: Response) => {
  try {
    const metadataBlock = await metadataBlockService.fetchAllData();
    res.json(metadataBlock);
  } catch (error) {
    res.status(500).json({ error: "Failed to load counts" });
  }
};
