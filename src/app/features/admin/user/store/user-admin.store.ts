import { Injectable, inject } from '@angular/core';
import { UserHttpRepository } from '@infrastructure/http/repositories/user-http-repository';
import { CreateUserDto, UpdateUserDto } from '@infrastructure/http/dtos';
import { User } from '@domain/models';
import { UserRole } from '@domain/enums';
import { BaseCrudStore } from '@shared/stores/base-crud.store';

@Injectable({
  providedIn: 'root',
})
export class UserAdminStore extends BaseCrudStore<User, CreateUserDto, UpdateUserDto> {
  constructor() {
    super(inject(UserHttpRepository));
  }

  setRole(role: UserRole | null) {
    this.filterBy.set(role ? { role } : null);
    this.page.set(1);
  }
}
