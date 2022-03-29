import { Routes } from '@angular/router';

import { AdminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: '',
        loadChildren: () => import('./features/home/home.module').then((m) => m.HomeModule),
        canActivate: [AdminGuard]
      }
    ]
  }
];
