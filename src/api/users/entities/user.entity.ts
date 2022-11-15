import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', unique: true, nullable: true })
  username: string;

  @Column({ select: false })
  @Exclude()
  password: string;

  @CreateDateColumn()
  @Exclude()
  created_at: string;

  @UpdateDateColumn()
  @Exclude()
  updated_at: string;
}
