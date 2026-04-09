import { Routes } from '@angular/router';

export const brandsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@features/admin/brands/pages/brand-list/brand-list').then((c) => c.BrandList),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('@features/admin/brands/pages/brand-form/brand-form').then((c) => c.BrandForm),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('@features/admin/brands/pages/brand-form/brand-form').then((c) => c.BrandForm),
  },
];
