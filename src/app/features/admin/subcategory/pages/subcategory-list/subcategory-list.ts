import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ItemList } from '@shared/components/ui/item-list/item-list';
import { ItemListTableActions } from '@shared/components/ui/item-list-table-actions/item-list-table-actions';
import { SpinnerTables } from '@shared/components/ui/spinner-tables/spinner-tables';
import { AdminDeleteConfirmStore } from '@shared/stores/admin-delete-confirm-store';
import { SubcategoryAdminStore } from '../../store/subcategory-admin-store';

@Component({
  selector: 'app-subcategory-list',
  imports: [DatePipe, ItemList, ItemListTableActions, SpinnerTables],
  templateUrl: './subcategory-list.html',
  styleUrl: './subcategory-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubcategoryList implements OnInit {
  private readonly subcategoryAdminStore = inject(SubcategoryAdminStore);
  private readonly adminDeleteConfirmStore = inject(AdminDeleteConfirmStore);

  readonly subcategories = this.subcategoryAdminStore.items;
  readonly isLoading = this.subcategoryAdminStore.isLoading;
  readonly error = this.subcategoryAdminStore.error;
  readonly errorMessage = this.subcategoryAdminStore.errorMessage;
  readonly totalPages = this.subcategoryAdminStore.totalPages;
  readonly hasNextPage = this.subcategoryAdminStore.hasNextPage;
  readonly hasPreviousPage = this.subcategoryAdminStore.hasPreviousPage;
  readonly page = this.subcategoryAdminStore.page;
  readonly limit = this.subcategoryAdminStore.limit;
  readonly total = this.subcategoryAdminStore.total;

  title = 'Subcategories';

  ngOnInit(): void {
    this.loadSubcategories();
  }

  loadSubcategories(): void {
    this.subcategoryAdminStore.reload();
    console.log(this.subcategoryAdminStore.items());
  }

  onItemsPerPage(limit: number) {
    this.subcategoryAdminStore.setLimit(limit);
  }

  onSearchSubcategories(search: string) {
    this.subcategoryAdminStore.searchItems(search);
  }

  onFirstPage() {
    this.subcategoryAdminStore.firstPage();
  }

  onLastPage() {
    this.subcategoryAdminStore.lastPage();
  }

  onNextPage() {
    this.subcategoryAdminStore.nextPage();
  }

  onPreviousPage() {
    this.subcategoryAdminStore.previousPage();
  }

  onDeleteItem(id: number) {
    this.adminDeleteConfirmStore.show(
      `Are you sure you want to delete subcategory with id ${String(id)}?`,
      () => {
        void this.subcategoryAdminStore.deleteItem(id);
      }
    );
  }
}
