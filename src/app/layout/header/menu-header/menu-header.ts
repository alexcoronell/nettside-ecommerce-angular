import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LucideDynamicIcon, LucideMenu } from '@lucide/angular';

@Component({
  selector: 'app-menu-header',
  imports: [LucideDynamicIcon],
  templateUrl: './menu-header.html',
  styleUrl: './menu-header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuHeader {
  lucideMenu = LucideMenu;
}
