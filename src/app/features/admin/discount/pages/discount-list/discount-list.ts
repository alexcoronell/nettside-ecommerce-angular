import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ItemList } from '@shared/components/ui/item-list/item-list';
import { ItemListTableActions } from '@shared/components/ui/item-list-table-actions/item-list-table-actions';
import { SpinnerTables } from '@shared/components/ui/spinner-tables/spinner-tables';
import { AdminDeleteConfirmStore } from '@shared/stores/admin-delete-confirm-store';
import { DiscountAdminStore } from '@features/admin/discount/store/discount-admin-store';

@Component({
  selector: 'app-discount-list',
  imports: [DatePipe, ItemList, ItemListTableActions, SpinnerTables],
  templateUrl: './discount-list.html',
  styleUrl: './discount-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscountList implements OnInit {
  private readonly discountAdminStore = inject(DiscountAdminStore);
  private readonly adminDeleteConfirmStore = inject(AdminDeleteConfirmStore);

  showFiltersButtons = signal<boolean>(false);

  readonly discounts = this.discountAdminStore.items;
  readonly isLoading = this.discountAdminStore.isLoading;
  readonly error = this.discountAdminStore.error;
  readonly errorMessage = this.discountAdminStore.errorMessage;
  readonly totalPages = this.discountAdminStore.totalPages;
  readonly hasNextPage = this.discountAdminStore.hasNextPage;
  readonly hasPreviousPage = this.discountAdminStore.hasPreviousPage;
  readonly page = this.discountAdminStore.page;
  readonly limit = this.discountAdminStore.limit;
  readonly total = this.discountAdminStore.total;

  title = 'Discounts';
  columns = ['Name', 'Discount Value', 'Start Date', 'End Date'];

  ngOnInit(): void {
    this.loadDiscounts();
  }

  toggleShowFilters() {
    this.showFiltersButtons.set(!this.showFiltersButtons());
  }

  loadDiscounts(): void {
    this.discountAdminStore.reload();
  }

  onItemsPerPage(limit: number) {
    this.discountAdminStore.setLimit(limit);
  }

  onSearchDiscounts(search: string) {
    this.discountAdminStore.searchItems(search);
  }

  onFirstPage() {
    this.discountAdminStore.firstPage();
  }

  onLastPage() {
    this.discountAdminStore.lastPage();
  }

  onNextPage() {
    this.discountAdminStore.nextPage();
  }

  onPreviousPage() {
    this.discountAdminStore.previousPage();
  }

  onDeleteItem(id: number) {
    this.adminDeleteConfirmStore.show(
      `Are you sure you want to delete discount with id ${String(id)}?`,
      () => {
        void this.discountAdminStore.deleteItem(id);
      }
    );
  }
}
