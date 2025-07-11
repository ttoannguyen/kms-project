import { Request, Response, NextFunction } from "express";
import * as service from "../../services/admin/adminAuth.service";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const result = await service.login(username, password);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const admin = await service.create(username, password);
    res.status(201).json(admin);
  } catch (err) {
    next(err);
  }
};

export const listAdmins = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const admins = await service.list();
    res.json(admins);
  } catch (err) {
    next(err);
  }
};