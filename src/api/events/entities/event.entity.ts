import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'events' })
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'date_from',
    type: 'date',
    nullable: true,
  })
  dateFrom: string;

  @Column({
    name: 'date_to',
    type: 'date',
    nullable: true,
  })
  dateTo: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'text' })
  note: string;

  @Exclude()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
