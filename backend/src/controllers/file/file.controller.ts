import { Request, Response } from "express";
import * as fileService from "../../services/file/file.service";

export const getFile = async (_req: Request, res: Response) => {
  const id: string = _req.query.id as string;
  try {
    const file = await fileService.fetchData(id);
    res.json(file);
  } catch (error) {
    res.status(500).json({ error: "Failed to load counts" });
  }
};

export const getMetadataFile = async (_req: Request, res: Response) => {
  const id: string = _req.query.id as string;
  try {
    const metadata = await fileService.fetchMetadata(id);
    res.json(metadata);
  } catch (error) {
    res.status(500).json({ error: "Failed to load counts" });
  }
};

export const getDownloadCount = async (_req: Request, res: Response) => {
  const id: string = _req.query.id as string;
  try {
    const downloadCount = await fileService.fetchDownloadCount(id);
    res.json(downloadCount);
  } catch (error) {
    res.status(500).json({ error: "Failed to load counts" });
  }
};
