import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  private readonly url = `${this.apiUrl}user`
  async count(): Promise<CountDto> {
    return fetch(`${this.url}/count`).then((res) => res.json());
  }

  getAll(paginationParams?: PaginationParams): HttpResourceRef<PaginatedResult<UserResponseDto>> {
    const queryParams = new URLSearchParams();
    if (paginationParams) {
      Object.entries(paginationParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      });
    }
    return httpResource(() => `${this.url}?${queryParams.toString()}`) as HttpResourceRef<PaginatedResult<User>>;
  }
  getById(id: number): Promise<User> {
    return fetch(`${this.url}/${id}`).then((res) => res.json());
  }
  create(entity: CreateUserDto): Promise<User> {
    return fetch(`${this.url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entity),
    }).then((res) => res.json());
  }
  update(id: number, entity: UpdateUserDto): Promise<User> {
    return fetch(`${this.url}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entity),
    }).then((res) => res.json());
  }
  delete(id: number): Promise<void> {
    return fetch(`${this.url}/${id}`, {
      method: 'DELETE',
    }).then((res) => res.json());
  }
}
