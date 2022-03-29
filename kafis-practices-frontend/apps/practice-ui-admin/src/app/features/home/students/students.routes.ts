import { Routes } from '@angular/router';

import { StudentsComponent } from './students.component';
import { StudentsEditorComponent } from './students-editor/students-editor.component';

export const routes: Routes = [
  {
    path: '',
    component: StudentsComponent,
    data: { state: 'students' }
  },
  {
    path: 'edit',
    component: StudentsEditorComponent,
    data: { state: 'news-editor' }
  }
];
