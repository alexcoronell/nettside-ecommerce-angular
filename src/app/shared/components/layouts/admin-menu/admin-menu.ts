import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-menu',
  imports: [RouterLink],
  templateUrl: './admin-menu.html',
  styleUrl: './admin-menu.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminMenu {
  readonly adminNavItems = [
    { label: 'Dashboard', route: '/admin/dashboard' },
    { label: 'Users', route: '/admin/users' },
  ];
}
