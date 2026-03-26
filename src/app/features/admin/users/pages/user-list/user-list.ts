import { Component, inject } from '@angular/core';
import { UserAdminStore } from '../../store/user-admin.store';

@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {
  private readonly userAdminStore = inject(UserAdminStore);

  readonly users = this.userAdminStore.users;
  readonly isLoading = this.userAdminStore.isLoading;
  readonly error = this.userAdminStore.error;
}
