import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Routes } from 'src/utils/types/routes.type';
import { Services } from 'src/utils/types/services.type';
import { CreateNewsDto, SearchNewsQuery } from './dtos/news.dto';
import { NewsService } from './news.service';

@ApiTags('News')
@Controller(Routes.NEWS)
export class NewsController {
  constructor(
    @Inject(Services.NEWS)
    private readonly newsService: NewsService,
  ) {}

  @Get('')
  getNews(@Query() searchNewsQuery: SearchNewsQuery) {
    return this.newsService.getNews(searchNewsQuery);
  }

  @Post('/create')
  createNews(@Body() newsData: CreateNewsDto) {
    return this.newsService.createNews(newsData);
  }
}
