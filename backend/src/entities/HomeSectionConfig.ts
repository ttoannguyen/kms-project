// src/models/HomeSectionConfig.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("home_section_configs")
export class HomeSectionConfig {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  sectionKey!: string; // 'news', 'siteUpdate', 'publicAnnouncements', 'posts', 'slide', 'topics'

  @Column()
  title!: string;

  @Column({ default: true })
  visible!: boolean;

  @Column({ default: 0 })
  order!: number;

  @Column("jsonb", { nullable: true })
  settings!: any; // postIds, limit, filter type...

  @CreateDateColumn()
  createdAt!: Date;
}
