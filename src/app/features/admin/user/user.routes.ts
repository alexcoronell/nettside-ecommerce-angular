import { Routes } from '@angular/router';

export const userRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@features/admin/user/pages/user-list/user-list').then((c) => c.UserList),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('@features/admin/user/pages/user-form/user-form').then((c) => c.UserForm),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('@features/admin/user/pages/user-form/user-form').then((c) => c.UserForm),
  },
];
