import { Routes } from '@angular/router';
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
    ],
  },
];
