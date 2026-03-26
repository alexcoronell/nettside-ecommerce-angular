import { Routes } from '@angular/router';
import { adminRoutes } from '@features/admin/admin.routes';
import { MainLayout } from '@layout/main-layout/main-layout';
import { HomePage } from '@features/catalog/pages/home-page/home-page';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        component: HomePage,
      },
      {
        path: 'login',
        loadComponent: () => import('@features/auth/pages/login/login').then((c) => c.Login),
      },
      {
        path: 'registration',
        loadComponent: () =>
          import('@features/auth/pages/registration/registration').then((c) => c.Registration),
      },
      {
        path: 'admin',
        children: adminRoutes,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
