import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ItemList } from '@shared/components/ui/item-list/item-list';
import { ItemListTableActions } from '@shared/components/ui/item-list-table-actions/item-list-table-actions';
import { SpinnerTables } from '@shared/components/ui/spinner-tables/spinner-tables';
import { AdminDeleteConfirmStore } from '@shared/stores/admin-delete-confirm-store';
import { CategoryAdminStore } from '../../store/category-admin-store';

@Component({
  selector: 'app-category-list',
  imports: [DatePipe, ItemList, ItemListTableActions, SpinnerTables],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryList implements OnInit {
  private readonly categoryAdminStore = inject(CategoryAdminStore);
  private readonly adminDeleteConfirmStore = inject(AdminDeleteConfirmStore);

  readonly categories = this.categoryAdminStore.items;
  readonly isLoading = this.categoryAdminStore.isLoading;
  readonly error = this.categoryAdminStore.error;
  readonly errorMessage = this.categoryAdminStore.errorMessage;
  readonly totalPages = this.categoryAdminStore.totalPages;
  readonly hasNextPage = this.categoryAdminStore.hasNextPage;
  readonly hasPreviousPage = this.categoryAdminStore.hasPreviousPage;
  readonly page = this.categoryAdminStore.page;
  readonly limit = this.categoryAdminStore.limit;
  readonly total = this.categoryAdminStore.total;

  title = 'Categories';
  columns = ['Name', 'Slug', 'Description'];

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryAdminStore.reload();
  }

  onItemsPerPage(limit: number) {
    this.categoryAdminStore.setLimit(limit);
  }

  onSearchCategories(search: string) {
    this.categoryAdminStore.searchItems(search);
  }

  onFirstPage() {
    this.categoryAdminStore.firstPage();
  }

  onLastPage() {
    this.categoryAdminStore.lastPage();
  }

  onNextPage() {
    this.categoryAdminStore.nextPage();
  }

  onPreviousPage() {
    this.categoryAdminStore.previousPage();
  }

  onDeleteItem(id: number) {
    this.adminDeleteConfirmStore.show(
      `Are you sure you want to delete category with id ${String(id)}?`,
      () => {
        void this.categoryAdminStore.deleteItem(id);
      }
    );
  }
}
