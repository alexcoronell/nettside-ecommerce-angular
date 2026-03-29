import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideDynamicIcon, LucidePlus, LucideArrowLeft, LucideRefreshCcw } from '@lucide/angular';
@Component({
  selector: 'app-header-item-list',
  imports: [RouterLink, LucideDynamicIcon],
  templateUrl: './header-item-list.html',
  styleUrl: './header-item-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderItemList {
  refresh = input.required<() => void>();
  lucidePlus = LucidePlus;
  lucideArrowLeft = LucideArrowLeft;
  lucideRefreshCcw = LucideRefreshCcw;

  onRefresh() {
    this.refresh()();
  }
}
