import { ApiProperty } from '@nestjs/swagger';

import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export enum MonthsEnum {
  JANUARY = 'January',
  FEBRUARY = 'February',
  MARCH = 'March',
  APRIL = 'April',
  MAY = 'May',
  JUNE = 'June',
  JULY = 'July',
  AUGUST = 'August',
  SEPTEMBER = 'September',
  OCTOBER = 'October',
  NOVEMBER = 'November',
  DECEMBER = 'December',
}

export class CreateEventDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDateString()
  dateFrom: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  dateTo?: string;

  @ApiProperty()
  @IsString()
  @MinLength(5)
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  note?: string;
}

export class FilterEventsOptions {
  @ApiProperty({ required: false, enum: MonthsEnum })
  @IsOptional()
  month: MonthsEnum;

  @ApiProperty({ required: false })
  @IsOptional()
  year: number;
}
