import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { AddBialDto, BialSearchQuery } from './dtos/add-bial.dto';
import { Bial } from './entities/bial.entity';

@Injectable()
export class BialService {
  constructor(
    @InjectRepository(Bial)
    private readonly bialRepository: Repository<Bial>,
  ) {}

  getBial = async ({ bialHming = '' }: BialSearchQuery) => {
    try {
      return await this.bialRepository.find({
        where: {
          bialHming: Raw(
            (alias) => `LOWER(${alias}) Like '%${bialHming.toLowerCase()}%'`,
          ),
        },
      });
    } catch (error) {
      throw error;
    }
  };

  getSingleBial = async ({ bialHming = '' }: BialSearchQuery) => {
    try {
      return await this.bialRepository.findOne({
        where: {
          bialHming: Raw(
            (alias) => `LOWER(${alias}) Like '%${bialHming.toLowerCase()}%'`,
          ),
        },
      });
    } catch (error) {
      throw error;
    }
  };

  addBial = async (bialDetails: AddBialDto) => {
    try {
      const bialObj = this.bialRepository.create(bialDetails);

      return await this.bialRepository.save(bialObj);
    } catch (error) {
      throw error;
    }
  };
}
