import { Request } from 'express';
import { User } from 'src/api/users/entities/user.entity';
import { LoginDto } from '../dtos/login.dto';

export interface IAuthService {
  validateUser(userCredentials: LoginDto): Promise<User | null>;
}

export interface AuthenticatedRequest extends Request {
  user: User;
}
