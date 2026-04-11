import { Injectable } from '@angular/core';

import { BaseCrudHttpRepository } from '../shared/base-crud-http.repository';
import { UserResponseDto, CreateUserDto, UpdateUserDto } from '@infrastructure/http/dtos';
import { UserRepository } from '@domain/repositories/user.repository';

@Injectable({
  providedIn: 'root',
})
export class UserHttpRepository
  extends BaseCrudHttpRepository<UserResponseDto, CreateUserDto, UpdateUserDto>
  implements UserRepository
{
  protected readonly path = 'user';
}
