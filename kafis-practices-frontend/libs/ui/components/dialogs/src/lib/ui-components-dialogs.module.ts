import { AdminOrderDialogComponent } from './admin-order-dialog/admin-order-dialog.component';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { AdminReportDialogComponent } from './admin-report-dialog/admin-report-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { UiElementsModule } from '@practice/ui/components/ui-elements';

import { LogoutConfirmationDialogComponent } from './logout-confirmation-dialog/logout-confirmation-dialog.component';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog/delete-confirmation-dialog.component';
import { OrganizationEditDialogComponent } from './organization-edit-dialog/organization-edit-dialog.component';
import { TeacherEditDialogComponent } from './teacher-edit-dialog/teacher-edit-dialog.component';
import { StudentGradeEditDialogComponent } from './student-grade-edit-dialog/student-grade-edit-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatRippleModule,
    RouterModule,
    TranslateModule,
    UiElementsModule
  ],
  declarations: [
    LogoutConfirmationDialogComponent,
    DeleteConfirmationDialogComponent,
    OrganizationEditDialogComponent,
    TeacherEditDialogComponent,
    StudentGradeEditDialogComponent,
    AdminReportDialogComponent,
    AdminOrderDialogComponent,
  ],
  exports: [
    LogoutConfirmationDialogComponent,
    DeleteConfirmationDialogComponent,
    OrganizationEditDialogComponent,
    TeacherEditDialogComponent,
    StudentGradeEditDialogComponent,
    AdminReportDialogComponent,
    AdminOrderDialogComponent,
  ],
})
export class UiComponentsDialogsModule {}
