import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../config/db/data-source";
import { Admin } from "../entities/Admin";

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || "defaultsecret";

export const authLocalAdmin: RequestHandler = async (req, res, next) => {
  const adminRepo = AppDataSource.getRepository(Admin);
  const adminCount = await adminRepo.count();

  // Bypass auth nếu chưa có admin và đang tạo admin đầu tiên
  if (adminCount === 0 && req.path === "/create" && req.method === "POST") {
    console.warn(
      "[WARN] No admin found — allowing first admin creation without token."
    );
    return next();
  }

  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Missing token" });
    return;
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;

    if (!payload.isAdmin) {
      res.status(403).json({ message: "Not an admin" });
      return;
    }

    (req as any).user = {
      id: payload.id,
      username: payload.username,
      roles: ["local-admin"],
    };

    return next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};
