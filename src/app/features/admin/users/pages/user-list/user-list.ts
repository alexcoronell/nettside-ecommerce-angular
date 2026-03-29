import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { UserAdminStore } from '@features/admin/users/store/user-admin.store';
import { ItemList } from '@shared/components/ui/item-list/item-list';
import { ItemListTableActions } from '@shared/components/ui/item-list-table-actions/item-list-table-actions';
import { SpinnerTables } from '@shared/components/ui/spinner-tables/spinner-tables';

@Component({
  selector: 'app-user-list',
  imports: [ItemList, ItemListTableActions, SpinnerTables],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserList implements OnInit {
  private readonly userAdminStore = inject(UserAdminStore);

  readonly users = this.userAdminStore.users;
  readonly isLoading = this.userAdminStore.isLoading;
  readonly error = this.userAdminStore.error;

  title = 'Users';
  columns = ['Fullname', 'Email', 'Phone', 'Role'];

  readonly refreshUsers = () => {
    this.loadUsers();
  };

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userAdminStore.loadUsers();
  }
}
