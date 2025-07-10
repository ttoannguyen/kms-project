// src/services/home/homeConfig.service.ts
import { HomeConfigRepository } from "../../repositories/HomeRepository";
import { AppDataSource } from "../../config/db/data-source";
import { HomeSectionConfig } from "../../entities/HomeSectionConfig";

const repo = new HomeConfigRepository(AppDataSource);

// import { HomeSectionConfig } from "../../models/HomeSectionConfig";
import { CreateHomeSectionConfigRequest, HomeSectionConfigDTO } from "../../types/home";

// Convert entity → DTO (giúp frontend không nhận nhầm data thô)
const toDTO = (config: HomeSectionConfig): HomeSectionConfigDTO => ({
  id: config.id,
  sectionKey: config.sectionKey as any,
  title: config.title,
  visible: config.visible,
  order: config.order,
  settings: config.settings || {},
  createdAt: config.createdAt.toISOString(),
});

export const getAll = async (): Promise<HomeSectionConfigDTO[]> => {
  const configs = await repo.findAll();
  return configs.map(toDTO);
};


export const updateConfig = async (
  id: string,
  data: Partial<HomeSectionConfig>
): Promise<void> => {
  await repo.updateConfig(id, data);
};

export const createConfig = async (
  data: CreateHomeSectionConfigRequest
): Promise<HomeSectionConfigDTO> => {
  const newConfig = await repo.createConfig({
    sectionKey: data.sectionKey,
    title: data.title,
    visible: data.visible ?? true,
    order: data.order ?? 0,
    settings: data.settings ?? {},
  });

  return toDTO(newConfig);
};
