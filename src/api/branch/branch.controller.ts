import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Routes } from 'src/utils/types/routes.type';
import { Services } from 'src/utils/types/services.type';
import { BranchService } from './branch.service';
import { AddBranchDto, SearchBranchQuery } from './dtos/branch.dto';

@ApiTags('Branch')
@Controller(Routes.BRANCH)
export class BranchController {
  constructor(
    @Inject(Services.BRANCH)
    private readonly branchService: BranchService,
  ) {}

  @Get('')
  getBranches(@Query() searchBranchQuery: SearchBranchQuery) {
    return this.branchService.getBranches(searchBranchQuery);
  }

  @Post('/add')
  addBranch(@Body() branchDetails: AddBranchDto) {
    return this.branchService.addBranch(branchDetails);
  }
}
