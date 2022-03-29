import { Routes } from '@angular/router';

import { TeacherComponent } from './teacher.component';

export const routes: Routes = [
  {
    path: '',
    component: TeacherComponent,
    data: { state: 'teacher' }
  }
];
