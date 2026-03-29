import { Component } from '@angular/core';
import { LucideDynamicIcon, LucidePlus, LucideArrowLeft, LucideRefreshCcw } from '@lucide/angular';
@Component({
  selector: 'app-header-item-list',
  imports: [LucideDynamicIcon],
  templateUrl: './header-item-list.html',
  styleUrl: './header-item-list.css',
})
export class HeaderItemList {
  lucidePlus = LucidePlus;
  lucideArrowLeft = LucideArrowLeft;
  lucideRefreshCcw = LucideRefreshCcw;
}
