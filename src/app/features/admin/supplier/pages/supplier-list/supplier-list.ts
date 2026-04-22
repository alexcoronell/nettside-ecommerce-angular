import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ItemList } from '@shared/components/ui/item-list/item-list';
import { ItemListTableActions } from '@shared/components/ui/item-list-table-actions/item-list-table-actions';
import { SpinnerTables } from '@shared/components/ui/spinner-tables/spinner-tables';
import { AdminDeleteConfirmStore } from '@shared/stores/admin-delete-confirm-store';
import { SupplierAdminStore } from '../../store/supplier-admin-store';

@Component({
  selector: 'app-supplier-list',
  imports: [ItemList, ItemListTableActions, SpinnerTables, DatePipe],
  templateUrl: './supplier-list.html',
  styleUrl: './supplier-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierList implements OnInit {
  private readonly supplierAdminStore = inject(SupplierAdminStore);
  private readonly adminDeleteConfirmStore = inject(AdminDeleteConfirmStore);

  readonly suppliers = this.supplierAdminStore.items;
  readonly isLoading = this.supplierAdminStore.isLoading;
  readonly error = this.supplierAdminStore.error;
  readonly errorMessage = this.supplierAdminStore.errorMessage;
  readonly totalPages = this.supplierAdminStore.totalPages;
  readonly hasNextPage = this.supplierAdminStore.hasNextPage;
  readonly hasPreviousPage = this.supplierAdminStore.hasPreviousPage;
  readonly page = this.supplierAdminStore.page;
  readonly limit = this.supplierAdminStore.limit;
  readonly total = this.supplierAdminStore.total;

  title = 'Suppliers';

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.supplierAdminStore.reload();
  }

  onItemsPerPage(limit: number) {
    this.supplierAdminStore.setLimit(limit);
  }

  onSearchSuppliers(search: string) {
    this.supplierAdminStore.searchItems(search);
  }

  onFirstPage() {
    this.supplierAdminStore.firstPage();
  }

  onLastPage() {
    this.supplierAdminStore.lastPage();
  }

  onNextPage() {
    this.supplierAdminStore.nextPage();
  }

  onPreviousPage() {
    this.supplierAdminStore.previousPage();
  }

  onDeleteItem(id: number) {
    this.adminDeleteConfirmStore.show(
      `Are you sure you want to delete supplier with id ${String(id)}?`,
      () => {
        void this.supplierAdminStore.deleteItem(id);
      }
    );
  }
}
