import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Services } from 'src/utils/types/services.type';
import { LoginDto } from '../dtos/login.dto';
import { IAuthService } from '../interfaces/auth.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(Services.AUTH) private readonly authService: IAuthService,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const result = await this.authService.validateUser({
      email,
      password,
    } as LoginDto);

    return result;
  }
}
