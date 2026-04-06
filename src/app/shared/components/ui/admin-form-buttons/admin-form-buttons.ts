import { Component, inject, input, output } from '@angular/core';
import { Location } from '@angular/common';
import { StatusForm } from '@shared/types';

@Component({
  selector: 'app-admin-form-buttons',
  imports: [],
  templateUrl: './admin-form-buttons.html',
  styleUrl: './admin-form-buttons.css',
})
export class AdminFormButtons {
  private readonly location = inject(Location);

  statusForm = input.required<StatusForm>();
  isLoading = input<boolean>(false);

  onEdit = output();
  onCancel = output();

  onBack() {
    this.location.back();
  }
}
