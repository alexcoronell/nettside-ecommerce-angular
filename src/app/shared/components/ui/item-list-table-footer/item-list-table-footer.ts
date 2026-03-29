import { Component } from '@angular/core';
import {
  LucideDynamicIcon,
  LucideChevronFirst,
  LucideChevronLeft,
  LucideChevronRight,
  LucideChevronLast,
} from '@lucide/angular';

@Component({
  selector: 'app-item-list-table-footer',
  imports: [LucideDynamicIcon],
  templateUrl: './item-list-table-footer.html',
  styleUrl: './item-list-table-footer.css',
})
export class ItemListTableFooter {
  lucideChevronFirst = LucideChevronFirst;
  lucideChevronLeft = LucideChevronLeft;
  lucideChevronRight = LucideChevronRight;
  lucideChevronLast = LucideChevronLast;
}
