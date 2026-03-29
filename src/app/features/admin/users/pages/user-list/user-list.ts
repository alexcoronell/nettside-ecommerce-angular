import { ChangeDetectionStrategy, Component, inject, OnInit, OnDestroy } from '@angular/core';
import { UserAdminStore } from '@features/admin/users/store/user-admin.store';
import { ItemList } from '@shared/components/ui/item-list/item-list';

@Component({
  selector: 'app-user-list',
  imports: [ItemList],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserList implements OnInit, OnDestroy {
  private readonly userAdminStore = inject(UserAdminStore);

  readonly users = this.userAdminStore.users;
  readonly isLoading = this.userAdminStore.isLoading;
  readonly error = this.userAdminStore.error;

  title = 'Users';
  columns = ['Fullname', 'Email', 'Phone', 'Role'];

  ngOnInit(): void {
    this.userAdminStore.loadUsers();
  }

  ngOnDestroy(): void {
    this.userAdminStore.reset();
  }
}
