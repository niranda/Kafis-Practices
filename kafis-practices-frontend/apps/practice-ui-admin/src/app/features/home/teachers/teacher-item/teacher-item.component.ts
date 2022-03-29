import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

import { TeacherService } from '@practice/common';
import { Teacher } from '@practice/interfaces';
import { EntityTypes } from '@practice/enums';
import { DeleteConfirmationDialogComponent, TeacherEditDialogComponent } from '@practice/ui/components/dialogs';

@Component({
  selector: 'practice-teacher-item',
  templateUrl: './teacher-item.component.html',
  styleUrls: ['./teacher-item.component.scss']
})
export class TeacherItemComponent {
  private readonly translateUpdated = this.translateService.instant('NOTIFICATIONS.UPDATE_SUCCESS');
  private readonly translateUpdateFailed = this.translateService.instant('NOTIFICATIONS.UPDATE_FAILED');
  private readonly translateDeleted = this.translateService.instant('NOTIFICATIONS.DELETE_SUCCESS');
  private readonly translateDeleteFailed = this.translateService.instant('NOTIFICATIONS.DELETE_FAILED');

  @Input() public teacher: Teacher;
  @Output() deleteEmitter: EventEmitter<Teacher> = new EventEmitter();

  constructor(private teacherService: TeacherService,
              private translateService: TranslateService,
              private toastrService: ToastrService,
              private dialog: MatDialog) { }

  public editTeacher(): void {
    const dialogRef = this.dialog.open(TeacherEditDialogComponent, {data: {teacher : this.teacher}});

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.teacherService.updateTeacher(data.teacher).subscribe((teacher: Teacher) => {
          if (teacher) {
            this.toastrService.success('', this.translateUpdated);
            this.teacher = data.teacher;
          }
          else {
            this.toastrService.error('', this.translateUpdateFailed);
          }
        });
      }
    });
  }

  public deleteTeacher(): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {data: {entityType : EntityTypes.Teacher}});

    dialogRef.afterClosed().subscribe(isDeleteButtonClicked => {
      if (isDeleteButtonClicked) {
        this.teacherService.deleteTeacher(this.teacher.id).subscribe((isDeleteSuccessful: boolean) => {
          if (isDeleteSuccessful) {
            this.toastrService.success('', this.translateDeleted);
            this.deleteEmitter.emit(this.teacher);
          }
          else {
            this.toastrService.error('', this.translateDeleteFailed);
          }
        });
      }
    });
  }
}
