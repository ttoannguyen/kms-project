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

export const getMetadataItem = async (_req: Request, res: Response) => {
  const name: string = _req.query.name as string;
  try {
    const metadataBlock = await metadataBlockService.fetchItemData(name);
    res.json(metadataBlock);
  } catch (error) {
    res.status(500).json({ error: "Failed to load counts" });
  }
};
