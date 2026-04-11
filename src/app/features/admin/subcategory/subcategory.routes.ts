import { Routes } from '@angular/router';

export const subcategoryRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@features/admin/subcategory/pages/subcategory-list/subcategory-list').then(
        (c) => c.SubcategoryList
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('@features/admin/subcategory/pages/subcategory-form/subcategory-form').then(
        (c) => c.SubcategoryForm
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('@features/admin/subcategory/pages/subcategory-form/subcategory-form').then(
        (c) => c.SubcategoryForm
      ),
  },
];
