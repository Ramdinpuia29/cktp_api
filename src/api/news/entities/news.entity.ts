import { BaseEntity } from 'src/database/base.entity';
import { Column, Entity } from 'typeorm';

export enum NewsType {
  SYNOD = 'Synod',
  CKTP = 'CKTP',
}

@Entity()
export class News extends BaseEntity {
  @Column({
    name: 'posted_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  postedAt: string;

  @Column({ type: 'varchar' })
  heading: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ enum: NewsType })
  type: NewsType;

  @Column({ name: 'image_url', nullable: true })
  imageUrl: string;
}
