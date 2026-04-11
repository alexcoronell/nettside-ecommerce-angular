import { Routes } from '@angular/router';

export const categoryRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@features/admin/category/pages/category-list/category-list').then(
        (c) => c.CategoryList
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('@features/admin/category/pages/category-form/category-form').then(
        (c) => c.CategoryForm
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('@features/admin/category/pages/category-form/category-form').then(
        (c) => c.CategoryForm
      ),
  },
];
