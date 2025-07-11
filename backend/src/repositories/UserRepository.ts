// import { Repository, DataSource } from "typeorm";
// import { User } from "../models/User";
// import { IRepository } from "./IRepository";

// export class UserRepository implements IRepository<User> {
//   private repository: Repository<User>;

//   constructor(dataSource: DataSource) {
//     this.repository = dataSource.getRepository(User);
//   }

//   async findAll(): Promise<User[]> {
//     return await this.repository.find();
//   }

//   async findById(id: string): Promise<User | null> {
//     return await this.repository.findOneBy({ id });
//   }

//   async create(data: User): Promise<User> {
//     const user = this.repository.create(data);
//     return await this.repository.save(user);
//   }

//   async findByEmail(email: string): Promise<User | null> {
//     return await this.repository.findOneBy({ email });
//   }
// }
