import { Routes } from '@angular/router';

import { TeachersComponent } from './teachers.component';

export const routes: Routes = [
  {
    path: '',
    component: TeachersComponent,
    data: { state: 'teachers' }
  }
];
