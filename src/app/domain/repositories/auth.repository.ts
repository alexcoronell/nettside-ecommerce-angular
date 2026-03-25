import { Observable } from 'rxjs';

import { User } from '@domain/models';
import { LoginDto } from '@infrastructure/http/dtos/';

interface LoginResponse {
  data: User;
  statusCode: number;
  message: string;
}

export abstract class AuthRepository {
  abstract login(loginDto: LoginDto): Observable<LoginResponse>;
  abstract logout(): Observable<unknown>;
}
