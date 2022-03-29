import { Routes } from '@angular/router';

import { HomeComponent } from './home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'students',
        loadChildren: () => import('./students/students.module').then((m) => m.StudentsModule),
      },
      {
        path: 'teachers',
        loadChildren: () => import('./teachers/teachers.module').then((m) => m.TeachersModule),
      },
      {
        path: 'organizations',
        loadChildren: () => import('./organizations/organizations.module').then((m) => m.OrganizationsModule),
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule),
      },
      {
        path: '**',
        redirectTo: 'students'
      }
    ]

  }
];
