import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Admin {
  @PrimaryGeneratedColumn("uuid")
    id!: string;

  @Column({ unique: true })
    username!: string;

  @Column()
    password!: string;

  @Column({ default: false })
    isSuperAdmin!: boolean;

  @CreateDateColumn()
    createdAt!: Date;
}
