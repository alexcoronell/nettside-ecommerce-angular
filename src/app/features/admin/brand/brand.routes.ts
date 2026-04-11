import { Routes } from '@angular/router';

export const brandRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@features/admin/brand/pages/brand-list/brand-list').then((c) => c.BrandList),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('@features/admin/brand/pages/brand-form/brand-form').then((c) => c.BrandForm),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('@features/admin/brand/pages/brand-form/brand-form').then((c) => c.BrandForm),
  },
];
