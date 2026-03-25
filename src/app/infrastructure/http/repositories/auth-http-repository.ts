import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthRepository } from '@domain/repositories';
import { LoginDto, LoginResponseDto } from '@infrastructure/http/dtos';
import { BaseHttpRepository } from '../shared/base-http.repository';

@Injectable({
  providedIn: 'root',
})
export class AuthHttpRepository extends BaseHttpRepository implements AuthRepository {
  private readonly url = this.apiUrl;

  login(payload: LoginDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${this.url}auth/login`, payload);
  }

  logout(): Observable<unknown> {
    return this.http.post<unknown>(`${this.url}/auth/logout`, {});
  }
}
