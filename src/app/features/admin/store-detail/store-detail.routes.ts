import { Routes } from '@angular/router';

export const storeDetailRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@features/admin/store-detail/pages/store-detail/store-detail').then(
        (c) => c.StoreDetail
      ),
  },
];
