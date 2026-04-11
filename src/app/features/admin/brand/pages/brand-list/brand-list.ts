import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ItemList } from '@shared/components/ui/item-list/item-list';
import { ItemListTableActions } from '@shared/components/ui/item-list-table-actions/item-list-table-actions';
import { SpinnerTables } from '@shared/components/ui/spinner-tables/spinner-tables';
import { AdminDeleteConfirmStore } from '@shared/stores/admin-delete-confirm-store';
import { BrandAdminStore } from '../../store/brand-admin-store';
import { ItemListImage } from '@shared/components/ui/item-list-image/item-list-image';
@Component({
  selector: 'app-brand-list',
  imports: [ItemList, ItemListTableActions, SpinnerTables, ItemListImage],
  templateUrl: './brand-list.html',
  styleUrl: './brand-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandList implements OnInit {
  private readonly brandAdminStore = inject(BrandAdminStore);
  private readonly adminDeleteConfirmStore = inject(AdminDeleteConfirmStore);

  readonly brands = this.brandAdminStore.items;
  readonly isLoading = this.brandAdminStore.isLoading;
  readonly error = this.brandAdminStore.error;
  readonly errorMessage = this.brandAdminStore.errorMessage;
  readonly totalPages = this.brandAdminStore.totalPages;
  readonly hasNextPage = this.brandAdminStore.hasNextPage;
  readonly hasPreviousPage = this.brandAdminStore.hasPreviousPage;
  readonly page = this.brandAdminStore.page;
  readonly limit = this.brandAdminStore.limit;
  readonly total = this.brandAdminStore.total;

  title = 'Brands';
  columns = ['Name', 'Slug', 'Description'];

  ngOnInit(): void {
    this.loadBrands();
  }

  loadBrands(): void {
    this.brandAdminStore.reload();
  }

  onItemsPerPage(limit: number) {
    this.brandAdminStore.setLimit(limit);
  }

  onSearchBrands(search: string) {
    this.brandAdminStore.searchItems(search);
  }

  onFirstPage() {
    this.brandAdminStore.firstPage();
  }

  onLastPage() {
    this.brandAdminStore.lastPage();
  }

  onNextPage() {
    this.brandAdminStore.nextPage();
  }

  onPreviousPage() {
    this.brandAdminStore.previousPage();
  }

  onDeleteItem(id: number) {
    this.adminDeleteConfirmStore.show(
      `Are you sure you want to delete brand with id ${String(id)}?`,
      () => {
        void this.brandAdminStore.deleteItem(id);
      }
    );
  }
}
