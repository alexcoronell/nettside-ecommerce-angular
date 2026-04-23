import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LucideCircleCheck, LucideCircleAlert } from '@lucide/angular';

@Component({
  selector: 'app-item-list-active',
  imports: [LucideCircleCheck, LucideCircleAlert],
  template: `<div class="flex items-center justify-center">
    @if (active()) {
      <svg lucideCircleCheck size="18" class="text-success"></svg>
    } @else {
      <svg lucideCircleAlert size="18" class="text-danger"></svg>
    }
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemListActive {
  public active = input<boolean>(false);
}
