import { Routes } from '@angular/router';

import { StudentComponent } from './student.component';

export const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
    data: { state: 'student' }
  }
];
