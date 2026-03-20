import { Observable } from 'rxjs';

import { User } from '@domain/models';
import { LoginDto } from '@infrastructure/http/dtos/';

export abstract class AuthRepository {
  abstract login(loginDto: LoginDto): Observable<User>;
  abstract logout(): Observable<unknown>;
}
