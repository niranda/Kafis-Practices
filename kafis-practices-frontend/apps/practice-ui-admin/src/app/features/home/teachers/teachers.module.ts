import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersComponent } from './teachers.component';
import { TeacherItemComponent } from './teacher-item/teacher-item.component';

@NgModule({
  imports: [
    CommonModule,
    TeachersRoutingModule,
    TranslateModule.forChild(),
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    FormsModule
  ],
  declarations: [
    TeachersComponent,
    TeacherItemComponent
  ]
})
export class TeachersModule { }
