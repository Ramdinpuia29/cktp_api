import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Routes } from 'src/utils/types/routes.type';
import { Services } from 'src/utils/types/services.type';
import { BialService } from './bial.service';
import { AddBialDto, BialSearchQuery } from './dtos/add-bial.dto';

@ApiTags('Bial')
@Controller(Routes.BIAL)
export class BialController {
  constructor(
    @Inject(Services.BIAL)
    private readonly bialService: BialService,
  ) {}

  @Get('')
  getBial(@Query() bialsearchQuery: BialSearchQuery) {
    return this.bialService.getBial(bialsearchQuery);
  }

  @Post('add')
  addBial(@Body() bialDetails: AddBialDto) {
    return this.bialService.addBial(bialDetails);
  }
}
