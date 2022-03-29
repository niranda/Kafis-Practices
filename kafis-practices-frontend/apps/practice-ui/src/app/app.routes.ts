import { Routes } from '@angular/router';

import { StudentGuard } from './core/guards/student.guard';
import { TeacherGuard } from './core/guards/teacher.guard';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'student',
        loadChildren: () => import('./features/student/student.module').then((m) => m.StudentModule),
        canActivate: [StudentGuard]
      },
      {
        path: 'teacher',
        loadChildren: () => import('./features/teacher/teacher.module').then((m) => m.TeacherModule),
        canActivate: [TeacherGuard]
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'auth'
      }
    ]
  }
];
