import { ChangeDetectionStrategy, Component, input, output, computed } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemListTableFooter {
  page = input<number>(1);
  limit = input<number>(10);
  total = input<number>(0);
  totalPages = input<number>(1);
  hasPreviousPage = input<boolean>(false);
  hasNextPage = input<boolean>(false);

  firstPage = output();
  lastPage = output();
  nextPage = output();
  previousPage = output();

  showing = computed(() => {
    if (!this.total()) return 'No items';
    if (this.limit() < this.total()) {
      const first = (this.page() - 1) * this.limit() + 1;
      const last = Math.min(this.page() * this.limit(), this.total());
      return `Showing ${String(first)} to ${String(last)} of ${String(this.total())} items`;
    }
    return 'Showing all items';
  });

  lucideChevronFirst = LucideChevronFirst;
  lucideChevronLeft = LucideChevronLeft;
  lucideChevronRight = LucideChevronRight;
  lucideChevronLast = LucideChevronLast;
}
