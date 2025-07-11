import { Repository, DataSource } from "typeorm";
import { Admin } from "../entities/Admin";

export class AdminRepository {
  private repo: Repository<Admin>;

  constructor(dataSource: DataSource) {
    this.repo = dataSource.getRepository(Admin);
  }

  findByUsername(username: string) {
    return this.repo.findOneBy({ username });
  }

  findAll() {
    return this.repo.find();
  }

  createAdmin(data: Partial<Admin>) {
    const admin = this.repo.create(data);
    return this.repo.save(admin);
  }
}
