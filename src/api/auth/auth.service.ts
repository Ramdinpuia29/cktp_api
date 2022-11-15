import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Services } from 'src/utils/types/services.type';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dtos/login.dto';
import { compareHash } from './helpers/auth.helper';
import { IAuthService } from './interfaces/auth.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.USERS)
    private readonly usersService: UsersService,
  ) {}

  async validateUser(userCredentials: LoginDto): Promise<User> {
    const user = await this.usersService.findUser(
      {
        email: userCredentials.email,
      },
      { selectAll: true },
    );

    if (!user) throw new UnauthorizedException('Invalid Credentials');

    const isPasswordValid = await compareHash(
      userCredentials.password,
      user.password,
    );

    return isPasswordValid ? user : null;
  }
}
