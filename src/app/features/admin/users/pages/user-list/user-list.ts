import { Component, inject } from '@angular/core';
import { UserAdminStore } from '@features/admin/users/store/user-admin.store';
import { ItemList } from '@shared/components/ui/item-list/item-list';

@Component({
  selector: 'app-user-list',
  imports: [ItemList],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {
  private readonly userAdminStore = inject(UserAdminStore);

  readonly users = this.userAdminStore.users;
  readonly isLoading = this.userAdminStore.isLoading;
  readonly error = this.userAdminStore.error;
}
