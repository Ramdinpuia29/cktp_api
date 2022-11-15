import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from '../auth/dtos/register.dto';
import { hashPassword } from '../auth/helpers/auth.helper';
import { FindUserDto, FindUserOptions } from './dtos/find-user.dto';
import { User } from './entities/user.entity';
import { IUsersService } from './interfaces/users-service.interface';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async createUser(userDetails: RegisterDto) {
    try {
      const existingUser = await this.usersRepository.findOne({
        where: [
          {
            email: userDetails.email,
          },
          {
            username: userDetails.username,
          },
        ],
      });

      if (existingUser) {
        if (existingUser.email === userDetails.email)
          throw new ConflictException('Email already taken');
        if (existingUser.username === userDetails.email)
          throw new ConflictException('Username should be unique');
      }

      const password = await hashPassword(userDetails.password);

      const userObj = this.usersRepository.create({
        ...userDetails,
        password,
      });

      return this.usersRepository.save(userObj);
    } catch (error) {
      throw error;
    }
  }

  async findUser(userDetails: FindUserDto, options?: FindUserOptions) {
    const selections: (keyof User)[] = ['email', 'username'];
    const selectionsWithPassword: (keyof User)[] = [...selections, 'password'];

    try {
      return this.usersRepository.findOne({
        where: userDetails,
        select: options?.selectAll ? selectionsWithPassword : selections,
      });
    } catch (error) {
      throw error;
    }
  }

  async searchUsers(query: string): Promise<{ users: User[] }> {
    const statement = '(user.username LIKE :query)';
    const users = await this.usersRepository
      .createQueryBuilder('user')
      .where(statement, { query: `%${query}%` })
      .limit(10)
      .select(['user.email', 'user.username'])
      .getMany();

    return { users };
  }
}
