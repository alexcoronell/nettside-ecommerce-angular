import { ChangeDetectionStrategy, Component, output } from '@angular/core';
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
  searchUsers = output<string>();
  refresh = output();
  lucidePlus = LucidePlus;
  lucideArrowLeft = LucideArrowLeft;
  lucideRefreshCcw = LucideRefreshCcw;

  onRefresh() {
    this.refresh.emit();
  }

  onSearchUsers(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchUsers.emit(value);
  }
}
