import { Component } from '@angular/core';
import { HeaderItemList } from '../header-item-list/header-item-list';
import { ItemListTableHeader } from '../item-list-table-header/item-list-table-header';
import { ItemListTableFooter } from '../item-list-table-footer/item-list-table-footer';

@Component({
  selector: 'app-item-list',
  imports: [HeaderItemList, ItemListTableHeader, ItemListTableFooter],
  templateUrl: './item-list.html',
  styleUrl: './item-list.css',
})
export class ItemList {}
