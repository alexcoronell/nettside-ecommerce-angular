import { ChangeDetectionStrategy, Component, inject, OnInit, output } from '@angular/core';
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
  readonly totalPages = this.userAdminStore.totalPages;
  readonly hasNextPage = this.userAdminStore.hasNextPage;
  readonly hasPreviousPage = this.userAdminStore.hasPreviousPage;
  readonly page = this.userAdminStore.page;
  readonly limit = this.userAdminStore.limit;
  readonly total = this.userAdminStore.total;

  title = 'Users';
  columns = ['Fullname', 'Email', 'Phone', 'Role'];

  refresh = output();
  firstPage = output();
  lastPage = output();
  nextPage = output();
  previousPage = output();

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userAdminStore.loadUsers();
  }

  onFirstPage() {
    this.userAdminStore.firstPage();
  }

  onLastPage() {
    this.userAdminStore.lastPage();
  }

  onNextPage() {
    this.userAdminStore.nextPage();
  }

  onPreviousPage() {
    this.userAdminStore.previousPage();
  }
}
