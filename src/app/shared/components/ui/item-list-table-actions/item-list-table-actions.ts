import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LucideDynamicIcon, LucidePencil, LucideTrash2 } from '@lucide/angular';

@Component({
  selector: 'app-item-list-table-actions',
  imports: [LucideDynamicIcon],
  templateUrl: './item-list-table-actions.html',
  styleUrl: './item-list-table-actions.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemListTableActions {
  lucidePencil = LucidePencil;
  lucideTrash2 = LucideTrash2;
}
