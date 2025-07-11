// src/repositories/AppConfigRepository.ts
import { Repository, In, DataSource } from "typeorm";
import { AppConfig } from "../entities/AppConfig";

export class AppConfigRepository {
  private repo: Repository<AppConfig>;

  constructor(dataSource: DataSource) {
    this.repo = dataSource.getRepository(AppConfig);
  }

  findOneByKey(key: string): Promise<AppConfig | null> {
    return this.repo.findOneBy({ key });
  }

  findPublic(): Promise<AppConfig[]> {
    return this.repo.find({ where: { isClientExposed: true } });
  }

  findAll(): Promise<AppConfig[]> {
    return this.repo.find();
  }

  findByKeys(keys: string[]): Promise<AppConfig[]> {
    return this.repo.find({ where: { key: In(keys) } });
  }

  create(data: Partial<AppConfig>): AppConfig {
    return this.repo.create(data);
  }

  save(config: AppConfig | AppConfig[]): Promise<AppConfig | AppConfig[]> {
    if (Array.isArray(config)) {
    return this.repo.save(config); 
  } else {
    return this.repo.save(config); 
  }
  }

  async bulkUpsert(data: Partial<AppConfig>[]) {
    const existing = await this.findByKeys(data.map((d) => d.key!));
    const existingMap = new Map(existing.map((e) => [e.key, e]));

    const toSave = data.map((d) => {
      const existingEntry = existingMap.get(d.key!);
      return this.create({
        ...existingEntry,
        ...d,
        updatedAt: new Date(),
      });
    });

    await this.save(toSave);
  }
}
