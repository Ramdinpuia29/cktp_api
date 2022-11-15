import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Services } from 'src/utils/types/services.type';
import { BialService } from '../bial/bial.service';
import { Bial } from '../bial/entities/bial.entity';
import { BranchController } from './branch.controller';
import { BranchService } from './branch.service';
import { Branch } from './entity/branch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Branch, Bial])],
  controllers: [BranchController],
  providers: [
    {
      provide: Services.BRANCH,
      useClass: BranchService,
    },
    {
      provide: Services.BIAL,
      useClass: BialService,
    },
  ],
})
export class BranchModule {}
