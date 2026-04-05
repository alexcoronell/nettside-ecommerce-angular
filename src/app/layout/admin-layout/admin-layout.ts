import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AdminFormNotification } from '@shared/components/ui/admin-form-notification/admin-form-notification';
import { AdminDeleteConfirm } from '@shared/components/ui/admin-delete-confirm/admin-delete-confirm';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, AdminFormNotification, AdminDeleteConfirm],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLayout {}
