import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { UserAdminStore } from '@features/admin/users/store/user-admin.store';
import { ItemList } from '@shared/components/ui/item-list/item-list';
import { ItemListTableActions } from '@shared/components/ui/item-list-table-actions/item-list-table-actions';
import { SpinnerTables } from '@shared/components/ui/spinner-tables/spinner-tables';
import { AdminDeleteConfirmStore } from '@shared/stores/admin-delete-confirm-store';
import { UserRole } from '@domain/enums';

@Component({
  selector: 'app-user-list',
  imports: [ItemList, ItemListTableActions, SpinnerTables, NgClass],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserList implements OnInit {
  private readonly userAdminStore = inject(UserAdminStore);
  private readonly adminDeleteConfirmStore = inject(AdminDeleteConfirmStore);

  showFiltersButtons = signal<boolean>(false);

  readonly users = this.userAdminStore.users;
  readonly isLoading = this.userAdminStore.isLoading;
  readonly error = this.userAdminStore.error;
  readonly totalPages = this.userAdminStore.totalPages;
  readonly hasNextPage = this.userAdminStore.hasNextPage;
  readonly hasPreviousPage = this.userAdminStore.hasPreviousPage;
  readonly page = this.userAdminStore.page;
  readonly limit = this.userAdminStore.limit;
  readonly total = this.userAdminStore.total;
  readonly _resource = this.userAdminStore._resource;

  title = 'Users';
  columns = ['Fullname', 'Email', 'Phone', 'Role'];

  ngOnInit(): void {
    this.loadUsers();
  }

  readonly userRoles = [
    { role: UserRole.ADMIN, label: 'Admins' },
    { role: UserRole.SELLER, label: 'Sellers' },
    { role: UserRole.CUSTOMER, label: 'Customers' },
  ];

  toggleShowFilters() {
    this.showFiltersButtons.set(!this.showFiltersButtons());
  }

  loadUsers(): void {
    this.userAdminStore.getUsers();
  }

  onItemsPerPage(limit: number) {
    this.userAdminStore.setLimit(limit);
  }

  onSearchUsers(search: string) {
    this.userAdminStore.searchUsers(search);
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

  onRoleChange(role: UserRole | null) {
    if (role) {
      this.userAdminStore.setRole(role);
    } else {
      this.userAdminStore.setRole(null);
    }
    this.loadUsers();
  }

  onDeleteItem(id: number) {
    this.adminDeleteConfirmStore.show(
      `Are you sure you want to delete user with id ${String(id)}?`,
      () => {
        void this.userAdminStore.deleteUser(id);
      }
    );
  }
}
