import { Routes } from '@angular/router';

export const usersRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@features/admin/users/pages/user-list/user-list').then((c) => c.UserList),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('@features/admin/users/pages/user-form/user-form').then((c) => c.UserForm),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('@features/admin/users/pages/user-form/user-form').then((c) => c.UserForm),
  },
];
