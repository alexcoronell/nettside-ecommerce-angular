import { Routes } from '@angular/router';
import { authGuard } from '@core/auth/guards/auth.guard';

export const adminRoutes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('@layout/admin-layout/admin-layout').then((c) => c.AdminLayout),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('@features/admin/dashboard/pages/dashboard/dashboard').then((c) => c.Dashboard),
      },
      {
        path: 'brands',
        loadChildren: () => import('@features/admin/brand/brand.routes').then((r) => r.brandRoutes),
      },
      {
        path: 'users',
        loadChildren: () => import('@features/admin/user/user.routes').then((r) => r.userRoutes),
      },
    ],
  },
];
