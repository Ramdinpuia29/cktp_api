import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AddBialDto {
  @ApiProperty()
  @IsString()
  bialHming: string;
}

export class BialSearchQuery {
  @ApiProperty({ required: false })
  @IsOptional()
  bialHming: string;
}
