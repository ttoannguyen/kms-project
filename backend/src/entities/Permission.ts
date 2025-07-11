// src/models/Permission.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("permissions")
export class Permission {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: string; // sub from Keycloak

  @Column()
  permission!: string; // "can_create_post"
}
