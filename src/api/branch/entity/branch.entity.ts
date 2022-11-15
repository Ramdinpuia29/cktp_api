import { Bial } from 'src/api/bial/entities/bial.entity';
import { BaseEntity } from 'src/database/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'branch' })
export class Branch extends BaseEntity {
  @Column({ name: 'branch_hming' })
  branchHming: string;

  @ManyToOne(() => Bial, (bial: Bial) => bial.branch)
  bial: Bial;
}
