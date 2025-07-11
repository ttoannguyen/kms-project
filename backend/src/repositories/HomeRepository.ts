// src/repositories/HomeConfigRepository.ts
import { Repository } from "typeorm";
import { HomeSectionConfig } from "../entities/HomeSectionConfig";
import { DataSource } from "typeorm";

export class HomeConfigRepository {
  private repo: Repository<HomeSectionConfig>;

  constructor(dataSource: DataSource) {
    this.repo = dataSource.getRepository(HomeSectionConfig);
  }

  async findAll(): Promise<HomeSectionConfig[]> {
    return await this.repo.find({ order: { order: "ASC" } });
  }

  async updateConfig(id: string, data: Partial<HomeSectionConfig>) {
    return await this.repo.update(id, data);
  }

  async createConfig(data: Partial<HomeSectionConfig>) {
    const config = this.repo.create(data);
    return await this.repo.save(config);
  }
}
