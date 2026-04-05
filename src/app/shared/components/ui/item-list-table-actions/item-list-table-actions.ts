import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideDynamicIcon, LucideEye, LucideTrash2 } from '@lucide/angular';

@Component({
  selector: 'app-item-list-table-actions',
  imports: [LucideDynamicIcon, RouterLink],
  templateUrl: './item-list-table-actions.html',
  styleUrl: './item-list-table-actions.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemListTableActions {
  readonly itemId = input.required<number>();
  readonly deleteItem = output<number>();

  lucideEye = LucideEye;
  lucideTrash2 = LucideTrash2;
}
