import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxFilesizeModule } from 'ngx-filesize';
import { TranslateModule } from '@ngx-translate/core';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';

@NgModule({
  imports: [
    CommonModule,
    StudentRoutingModule,
    TranslateModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatRippleModule,
    NgxFilesizeModule,
  ],
  declarations: [StudentComponent]
})
export class StudentModule { }
