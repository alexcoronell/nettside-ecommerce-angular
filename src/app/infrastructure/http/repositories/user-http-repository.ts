import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { httpResource, HttpResourceRef } from '@angular/common/http';

import { BaseHttpRepository } from '../shared/base-http.repository';
import { User } from '@domain/models';
import { CountDto, UserResponseDto, CreateUserDto, UpdateUserDto } from '@infrastructure/http/dtos';
import { UserRepository } from '@domain/repositories/user.repository';
import { PaginationParams, PaginatedResult } from '@domain/types';

@Injectable({
  providedIn: 'root',
})
export class UserHttpRepository extends BaseHttpRepository implements UserRepository {
  private readonly url = `${this.apiUrl}user`;

  count(): Promise<CountDto> {
    return firstValueFrom(this.http.get<CountDto>(`${this.url}/count`));
  }

  getAll(paginationParams?: PaginationParams): HttpResourceRef<PaginatedResult<UserResponseDto>> {
    const queryParams = new URLSearchParams();
    if (paginationParams) {
      Object.entries(paginationParams).forEach(([key, value]) => {
        if (value !== undefined && value !== '' && value !== null) {
          queryParams.append(key, String(value));
        }
      });
    }
    console.log('QUERY ===> ', queryParams.toString());
    return httpResource(() => `${this.url}?${queryParams.toString()}`) as HttpResourceRef<
      PaginatedResult<User>
    >;
  }

  getById(id: number): Promise<User> {
    return firstValueFrom(this.http.get<User>(`${this.url}/${id.toString()}`));
  }

  create(dto: CreateUserDto): Observable<User> {
    return this.http.post<User>(this.url, dto);
  }

  update(id: number, dto: UpdateUserDto): Promise<User> {
    return firstValueFrom(this.http.put<User>(`${this.url}/${id.toString()}`, dto));
  }

  delete(id: number): Promise<unknown> {
    return firstValueFrom(this.http.delete<unknown>(`${this.url}/${id.toString()}`));
  }
}
