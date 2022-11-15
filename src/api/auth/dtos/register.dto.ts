import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User } from 'src/api/users/entities/user.entity';
import { Match } from 'src/utils/decorators/match.decorator';

export class RegisterDto implements Partial<User> {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(32)
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d)(?=.*\W).*$/, {
    message: 'Password too weak',
  })
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @Match(RegisterDto, (registerDto: RegisterDto) => registerDto.password)
  confirmPassword: string;
}
