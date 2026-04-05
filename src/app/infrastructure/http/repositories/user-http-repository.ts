import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { httpResource, HttpResourceRef } from '@angular/common/http';

import { BaseHttpRepository } from '../shared/base-http.repository';
import { User } from '@domain/models';
import { CountDto, UserResponseDto, CreateUserDto, UpdateUserDto } from '@infrastructure/http/dtos';
import { UserRepository } from '@domain/repositories/user.repository';
import { PaginationParams, PaginatedResult, ItemResult } from '@domain/types';
import { generateQueryParams } from '@shared/utils';

@Injectable({
  providedIn: 'root',
})
export class UserHttpRepository extends BaseHttpRepository implements UserRepository {
  private readonly url = `${this.apiUrl}user`;

  count(): Promise<CountDto> {
    return firstValueFrom(this.http.get<CountDto>(`${this.url}/count`));
  }

  getAll(
    paginationParams?: PaginationParams | (() => PaginationParams)
  ): HttpResourceRef<PaginatedResult<UserResponseDto>> {
    return httpResource(() => {
      const queryParams = generateQueryParams(paginationParams);
      return `${this.url}?${queryParams}`;
    }) as HttpResourceRef<PaginatedResult<User>>;
  }

  getById(id: number): Observable<ItemResult<UserResponseDto>> {
    return this.http.get<ItemResult<UserResponseDto>>(`${this.url}/${id.toString()}`);
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
