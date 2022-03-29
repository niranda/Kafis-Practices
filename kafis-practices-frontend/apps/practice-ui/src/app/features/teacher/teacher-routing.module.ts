import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './teacher.routes';

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
