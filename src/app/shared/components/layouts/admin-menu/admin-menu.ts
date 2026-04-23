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
    { label: 'Brands', route: '/admin/brands' },
    { label: 'Categories', route: '/admin/categories' },
    { label: 'Discounts', route: '/admin/discounts' },
    { label: 'Subcategories', route: '/admin/subcategories' },
    { label: 'Suppliers', route: '/admin/suppliers' },
    { label: 'Store Detail', route: '/admin/store-detail' },
    { label: 'Users', route: '/admin/users' },
  ];
}
