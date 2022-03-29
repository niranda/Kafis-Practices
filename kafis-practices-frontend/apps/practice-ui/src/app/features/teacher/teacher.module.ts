import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherComponent } from './teacher.component';
import { StudentItemComponent } from './student-item/student-item.component';

@NgModule({
  imports: [
    CommonModule,
    TeacherRoutingModule,
    TranslateModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    TeacherComponent,
    StudentItemComponent
  ]
})
export class TeacherModule { }
