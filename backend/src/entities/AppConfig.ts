// src/entities/AppConfig.ts
import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class AppConfig {
  @PrimaryColumn()
  key!: string;

  @Column()
  value!: string;

  @Column({ default: "string" })
  type!: "string" | "number" | "boolean" | "json";

  @Column({ default: false })
  isSecret!: boolean;

  @Column({ default: false })
  isClientExposed!: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt!: Date;
}
