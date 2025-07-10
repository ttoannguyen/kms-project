// ✅ src/services/permission.service.ts
import { AppDataSource } from "../../config/db/data-source";
import { Permission } from "../../entities/Permission";

export const getUserPermissions = async (userId: string): Promise<string[]> => {
  const repo = AppDataSource.getRepository(Permission);
  const perms = await repo.findBy({ userId });
  return perms.map((p) => p.permission);
};

export const hasPermission = async (
  userId: string,
  permission: string
): Promise<boolean> => {
  const repo = AppDataSource.getRepository(Permission);
  const found = await repo.findOneBy({ userId, permission });
  return !!found;
};
