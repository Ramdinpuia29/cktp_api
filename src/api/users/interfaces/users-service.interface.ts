import { RegisterDto } from 'src/api/auth/dtos/register.dto';
import { FindUserDto } from '../dtos/find-user.dto';
import { User } from '../entities/user.entity';

export interface IUsersService {
  createUser(userDetails: RegisterDto): Promise<User>;
  findUser(userDetails: FindUserDto): Promise<User>;
  searchUsers(query: string): Promise<{ users: User[] }>;
}
