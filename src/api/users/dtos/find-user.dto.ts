import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { User } from '../entities/user.entity';

export class FindUserDto implements Partial<User> {
  @ApiProperty({ required: false })
  @IsOptional()
  id?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  username?: string;
}

export class FindUserOptions {
  @ApiProperty()
  @IsOptional()
  selectAll: boolean;
}
