import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Services } from 'src/utils/types/services.type';
import { Raw, Repository } from 'typeorm';
import { BialService } from '../bial/bial.service';
import { AddBranchDto, SearchBranchQuery } from './dtos/branch.dto';
import { Branch } from './entity/branch.entity';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(Branch)
    private readonly branchRepository: Repository<Branch>,
    @Inject(Services.BIAL)
    private readonly bialService: BialService,
  ) {}

  getBranches = async ({
    branchHming = '',
    bialHming = '',
  }: SearchBranchQuery) => {
    try {
      return await this.branchRepository.find({
        where: {
          branchHming: Raw(
            (alias) => `LOWER(${alias}) Like '%${branchHming.toLowerCase()}%'`,
          ),
          bial: {
            bialHming: Raw(
              (alias) => `LOWER(${alias}) Like '%${bialHming.toLowerCase()}%'`,
            ),
          },
        },
      });
    } catch (error) {
      throw error;
    }
  };

  addBranch = async ({ branchHming, bialHming }: AddBranchDto) => {
    try {
      const bial = await this.bialService.getSingleBial({ bialHming });

      const branchObj = this.branchRepository.create({ branchHming, bial });

      return await this.branchRepository.save(branchObj);
    } catch (error) {
      throw error;
    }
  };
}
