import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { HeaderItemList } from '../header-item-list/header-item-list';
import { ItemListTableFooter } from '../item-list-table-footer/item-list-table-footer';

@Component({
  selector: 'app-item-list',
  imports: [HeaderItemList, ItemListTableFooter],
  templateUrl: './item-list.html',
  styleUrl: './item-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemList {
  title = input.required<string>();
  add = input.required<string>();

  page = input<number>(1);
  limit = input.required<number>();
  total = input.required<number>();
  totalPages = input<number>(1);
  hasPreviousPage = input<boolean>(false);
  hasNextPage = input<boolean>(false);

  refresh = output();
  itemsPerPage = output<number>();
  searchUsers = output<string>();
  firstPage = output();
  lastPage = output();
  nextPage = output();
  previousPage = output();
}
