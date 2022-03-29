import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { UiComponentsTablesModule } from '@practice/ui/components/tables';
import { UiElementsModule } from '@practice/ui/components/ui-elements';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { StudentsEditorComponent } from './students-editor/students-editor.component';


@NgModule({
  imports: [
    CommonModule,
    StudentsRoutingModule,
    TranslateModule.forChild(),
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    UiElementsModule,
    UiComponentsTablesModule,
  ],
  declarations: [
    StudentsComponent,
    StudentsEditorComponent
  ]
})
export class StudentsModule { }
