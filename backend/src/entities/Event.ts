// src/models/Post.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("events")
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
