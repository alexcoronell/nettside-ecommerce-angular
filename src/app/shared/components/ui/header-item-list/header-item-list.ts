import { ChangeDetectionStrategy, Component, output, input, computed } from '@angular/core';
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
  itemsPerPage = output<number>();
  limit = input.required<number>();
  total = input.required<number>();
  lucidePlus = LucidePlus;
  lucideArrowLeft = LucideArrowLeft;
  lucideRefreshCcw = LucideRefreshCcw;

  defaultItemsPerPageOptions = [
    { label: '5', value: 5 },
    { label: '10', value: 10 },
    { label: '25', value: 25 },
    { label: '50', value: 50 },
    { label: '100', value: 100 },
  ];

  itemsPerPageOptions = computed(() => {
    const total = this.total();
    const options = this.defaultItemsPerPageOptions.filter((option) => option.value < total);
    const nextOption = this.defaultItemsPerPageOptions.find((option) => option.value >= total);
    if (nextOption) {
      options.push({ label: 'All', value: total });
    }
    return options.length > 0 ? options : [this.defaultItemsPerPageOptions[0]];
  });

  currentLimit = computed(() => this.limit());

  onRefresh() {
    this.refresh.emit();
  }

  onItemsPerPage(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.itemsPerPage.emit(Number(value));
  }

  onSearchUsers(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchUsers.emit(value);
  }
}
