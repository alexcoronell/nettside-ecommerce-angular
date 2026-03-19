import { User } from '@domain/models';
import { LoginDto } from '@infrastructure/http/dtos/';

export abstract class AuthRepository {
  abstract login(loginDto: LoginDto): Promise<User>;
  abstract logout(): Promise<void>;
  abstract getCurrentUser(): Promise<User>;
}
