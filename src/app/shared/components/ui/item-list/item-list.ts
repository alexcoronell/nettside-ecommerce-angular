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
  refresh = output();
  add = input.required<string>();
}
