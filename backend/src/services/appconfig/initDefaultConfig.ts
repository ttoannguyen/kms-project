// src/services/appconfig/initDefaultAppConfigKeys.ts
import { AppDataSource } from "../../config/db/data-source";
import { defaultAppConfigs } from "../../config/defaultAppConfig";
import { AppConfigRepository } from "../../repositories/AppConfigRepository";

export const initDefaultAppConfigKeys = async () => {
  const repo = new AppConfigRepository(AppDataSource);

  for (const config of defaultAppConfigs) {
    const exists = await repo.findOneByKey(config.key);

    if (!exists) {
      const newConfig = repo.create({
        ...config,
        updatedAt: new Date(),
      });

      await repo.save(newConfig);
      console.log(`[INIT] Created config key: ${config.key}`);
    }
  }
};
