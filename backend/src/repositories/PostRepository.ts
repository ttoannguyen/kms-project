import { DataSource, Repository } from "typeorm";
import { Post } from "../models/Post";
import { IRepository } from "./IRepository";

export class PostRepository implements IRepository<Post> {
  private repository: Repository<Post>;
  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Post);
  }
  async findAll(): Promise<Post[]> {
    return await this.repository.find();
  }
  async findById(id: string): Promise<Post | null> {
    return await this.repository.findOneBy({id})
  }
}
