import { Request, Response, NextFunction } from "express";
import { hasPermission } from "../services/permission/permission.service";

export function requirePermission(permission: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const ok = await hasPermission(userId, permission);
    if (!ok) {
      return res.status(403).json({ error: "Permission denied" });
    }

    next();
  };
}
