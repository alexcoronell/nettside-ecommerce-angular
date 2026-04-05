import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AdminDeleteConfirmStore } from '@shared/stores/admin-delete-confirm-store';

@Component({
  selector: 'app-admin-delete-confirm',
  imports: [],
  templateUrl: './admin-delete-confirm.html',
  styleUrl: './admin-delete-confirm.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDeleteConfirm {
  private readonly adminDeleteConfirmStore = inject(AdminDeleteConfirmStore);

  readonly message$ = this.adminDeleteConfirmStore.message$;
  readonly showConfirm$ = this.adminDeleteConfirmStore.showConfirm$;

  cancel() {
    this.adminDeleteConfirmStore.hide();
  }

  confirm() {
    this.adminDeleteConfirmStore.confirm();
  }
}
