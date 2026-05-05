import { Routes } from '@angular/router';

export const productRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@features/admin/product/pages/product-list/product-list').then((c) => c.ProductList),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('@features/admin/product/pages/product-form/product-form').then((c) => c.ProductForm),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('@features/admin/product/pages/product-form/product-form').then((c) => c.ProductForm),
  },
];
