import { Routes } from '@angular/router';

export const supplierRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@features/admin/supplier/pages/supplier-list/supplier-list').then(
        (c) => c.SupplierList
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('@features/admin/supplier/pages/supplier-form/supplier-form').then(
        (c) => c.SupplierForm
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('@features/admin/supplier/pages/supplier-form/supplier-form').then(
        (c) => c.SupplierForm
      ),
  },
];
