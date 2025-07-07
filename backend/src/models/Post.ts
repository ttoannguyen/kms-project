// ✅ src/models/Post.ts - Định nghĩa bài viết
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

// src/models/Post.ts
@Entity("posts")
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column("text")
  content!: string;

  @Column()
  userId!: string; // Lưu sub từ Keycloak, không liên kết

  @CreateDateColumn()
  createdAt!: Date;
}
