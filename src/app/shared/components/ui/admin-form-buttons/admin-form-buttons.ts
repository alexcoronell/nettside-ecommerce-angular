import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { StatusForm } from '@shared/types';

@Component({
  selector: 'app-admin-form-buttons',
  imports: [],
  templateUrl: './admin-form-buttons.html',
  styleUrl: './admin-form-buttons.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminFormButtons {
  private readonly location = inject(Location);
  private readonly router = inject(Router);

  statusForm = input.required<StatusForm>();
  isLoading = input<boolean>(false);
  goto = input<string | null>(null);

  onEdit = output();
  onCancel = output();

  onBack() {
    const url = this.goto();
    if (url) {
      void this.router.navigate([url]);
    } else {
      this.location.back();
    }
  }
}
