import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("posts")
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @Column()
  userId!: string; // Lưu `sub` từ Keycloak để xác định người đăng

  @CreateDateColumn()
  createdAt!: Date;
}
