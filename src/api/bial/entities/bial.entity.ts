import { Branch } from 'src/api/branch/entity/branch.entity';
import { BaseEntity } from 'src/database/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'bial' })
export class Bial extends BaseEntity {
  @Column({ name: 'bial_hming' })
  bialHming: string;

  @OneToMany(() => Branch, (branch: Branch) => branch.bial)
  branch: Branch[];
}
