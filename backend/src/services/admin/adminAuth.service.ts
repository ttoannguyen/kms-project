import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AdminRepository } from "../../repositories/AdminRepository";
import { AppDataSource } from "../../config/db/data-source";

const repo = new AdminRepository(AppDataSource);
const JWT_SECRET = process.env.ADMIN_JWT_SECRET || "defaultsecret";

export const login = async (username: string, password: string) => {
  const admin = await repo.findByUsername(username);
  if (!admin) throw new Error("Invalid username or password");

  const match = await bcrypt.compare(password, admin.password);
  if (!match) throw new Error("Invalid username or password");

  const token = jwt.sign({ id: admin.id, username: admin.username, isAdmin: true }, JWT_SECRET, {
    expiresIn: "1d",
  });

  return { token };
};

export const create = async (username: string, password: string) => {
  const hashed = await bcrypt.hash(password, 10);
  return repo.createAdmin({ username, password: hashed });
};

export const list = async () => {
  return repo.findAll();
};