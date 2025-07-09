// src/controllers/home/homeConfig.controller.ts
import { Request, Response, NextFunction } from "express";
import * as homeConfigService from "../../services/home/homeConfig.service";

export const getHomeConfig = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const config = await homeConfigService.getAll();
    res.json(config);
  } catch (error) {
    next(error);
  }
};

export const updateHomeConfig = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = req.body;
    await homeConfigService.updateConfig(id, data);
    res.json({ message: "Config updated" });
  } catch (error) {
    next(error);
  }
};

export const createHomeConfig = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const result = await homeConfigService.createConfig(data);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
