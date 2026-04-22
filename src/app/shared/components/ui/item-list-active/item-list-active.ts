import { Component, input } from '@angular/core';
import { LucideDynamicIcon, LucideCircleCheck, LucideCircleAlert } from '@lucide/angular';

@Component({
  selector: 'app-item-list-active',
  imports: [LucideDynamicIcon, LucideCircleCheck, LucideCircleAlert],
  templateUrl: './item-list-active.html',
  styleUrl: './item-list-active.css',
})
export class ItemListActive {
  public active = input<boolean>(false);
  lucideCircleCheck = LucideCircleCheck;
  lucideCircleAlert = LucideCircleAlert;
}
