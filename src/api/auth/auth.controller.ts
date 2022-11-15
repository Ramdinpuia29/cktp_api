import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { instanceToPlain } from 'class-transformer';
import { Response } from 'express';
import RequestWithUser from 'src/utils/interfaces/request-with-user.interface';
import { Routes } from 'src/utils/types/routes.type';
import { Services } from 'src/utils/types/services.type';
import { IUsersService } from '../users/interfaces/users-service.interface';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { LocalAuthGuard } from './guards/local.guard';
import {
  AuthenticatedRequest,
  IAuthService,
} from './interfaces/auth.interface';

@ApiTags('Auth')
@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private readonly authService: IAuthService,
    @Inject(Services.USERS) private readonly usersService: IUsersService,
  ) {}

  @Post('register')
  async registerUser(@Body() createUserDto: RegisterDto) {
    return instanceToPlain(await this.usersService.createUser(createUserDto));
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login(@Res() res: Response, @Body() _loginDto: LoginDto) {
    return res.sendStatus(HttpStatus.OK);
  }

  @Get('status')
  @UseGuards(AuthenticatedGuard)
  status(@Req() req: RequestWithUser, @Res() res: Response) {
    return res.send(req.user);
  }

  @Post('logout')
  @UseGuards(AuthenticatedGuard)
  logout(@Req() req: AuthenticatedRequest, @Res() res: Response) {
    req.logout((err) => {
      return err
        ? res.sendStatus(HttpStatus.BAD_REQUEST)
        : res.sendStatus(HttpStatus.OK);
    });
  }
}
