import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Routes } from 'src/utils/types/routes.type';
import { Services } from 'src/utils/types/services.type';
import { FindUserDto } from './dtos/find-user.dto';
import { IUsersService } from './interfaces/users-service.interface';

@ApiTags('Users')
@Controller(Routes.USERS)
export class UsersController {
  constructor(
    @Inject(Services.USERS)
    private usersService: IUsersService,
  ) {}

  @Get()
  async findUser(@Query() userDetails: FindUserDto) {
    const result = await this.usersService.findUser(userDetails);
    return { message: 'User', result };
  }

  @Get('search')
  async searchUsers(@Query('q') query: string) {
    const result = await this.usersService.searchUsers(query);
    return { message: 'All users', result };
  }
}
