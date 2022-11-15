import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { NewsType } from '../entities/news.entity';

export class CreateNewsDto {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  heading: string;

  @ApiProperty()
  @IsString()
  @MinLength(10)
  content: string;

  @ApiProperty({ enum: NewsType })
  @IsEnum(NewsType)
  type: NewsType;

  @ApiProperty()
  @IsOptional()
  imageUrl: string;
}

export class SearchNewsQuery {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  search: string;
}
