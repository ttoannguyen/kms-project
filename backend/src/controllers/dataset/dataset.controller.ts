import { Request, Response } from "express";
import * as datasetService from "./../../services/dataset/dataset.service";

export const getDataset = async (_req: Request, res: Response) => {
  const persistentId: string = _req.query.persistentId as string;
  try {
    const dataset = await datasetService.fetchDataset(persistentId);
    res.json(dataset);
  } catch (error) {
    res.status(500).json({ error: "Failed to load counts" });
  }
};

export const getDatasetDownloadCount = async (_req: Request, res: Response) => {
  const id: string = _req.query.id as string;
  try {
    const downloadCount = await datasetService.fetchDownloadCount(id);
    res.json(downloadCount);
  } catch (error) {
    res.status(500).json({ error: "Failed to load counts" });
  }
};

export const getDownloadSize = async (_req: Request, res: Response) => {
  const id: string = _req.query.id as string;
  const version: string = _req.query.version as string;
  try {
    const downloadCount = await datasetService.fetchDownloadSize(id, version);
    res.json(downloadCount);
  } catch (error) {
    res.status(500).json({ error: "Failed to load counts" });
  }
};
