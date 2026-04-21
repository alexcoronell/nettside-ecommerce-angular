import { Routes } from '@angular/router';

export const discountRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@features/admin/discount/pages/discount-list/discount-list').then(
        (c) => c.DiscountList
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('@features/admin/discount/pages/discount-form/discount-form').then(
        (c) => c.DiscountForm
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('@features/admin/discount/pages/discount-form/discount-form').then(
        (c) => c.DiscountForm
      ),
  },
];
