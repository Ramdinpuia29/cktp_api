/* eslint-disable @typescript-eslint/ban-types */
import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/api/users/entities/user.entity';
import { IUsersService } from 'src/api/users/interfaces/users-service.interface';
import { Services } from 'src/utils/types/services.type';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(Services.USERS)
    private readonly usersService: IUsersService,
  ) {
    super();
  }

  serializeUser(user: User, done: Function) {
    done(null, user);
  }
  async deserializeUser(user: User, done: Function) {
    const userDb = await this.usersService.findUser({ id: user.id });
    return userDb ? done(null, userDb) : done(null, null);
  }
}
