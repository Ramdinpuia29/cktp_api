import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AddBranchDto {
  @ApiProperty()
  @IsString()
  branchHming: string;

  @ApiProperty()
  @IsOptional()
  bialHming: string;
}

export class SearchBranchQuery {
  @ApiProperty({ required: false })
  @IsOptional()
  branchHming: string;

  @ApiProperty({ required: false })
  @IsOptional()
  bialHming: string;
}
