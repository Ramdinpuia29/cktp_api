import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { CreateNewsDto, SearchNewsQuery } from './dtos/news.dto';
import { News } from './entities/news.entity';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
  ) {}

  getNews = async ({ search = '' }: SearchNewsQuery) => {
    try {
      return await this.newsRepository.find({
        take: 10,
        skip: 0,
        order: {
          postedAt: 'desc',
        },
        where: [
          {
            heading: Raw(
              (alias) => `LOWER(${alias}) Like '%${search.toLowerCase()}%'`,
            ),
          },
          {
            content: Raw(
              (alias) => `LOWER(${alias}) Like '%${search.toLowerCase()}%'`,
            ),
          },
        ],
      });
    } catch (error) {
      throw error;
    }
  };

  createNews = async (newsData: CreateNewsDto) => {
    try {
      const newsObj = this.newsRepository.create(newsData);

      return await this.newsRepository.save(newsObj);
    } catch (error) {
      throw error;
    }
  };
}
