import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

import { TeacherService } from '@practice/common';
import { Teacher } from '@practice/interfaces';
import { TeacherEditDialogComponent } from '@practice/ui/components/dialogs';

@Component({
  selector: 'practice-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {
  private readonly translateCreated = this.translateService.instant('NOTIFICATIONS.CREATE_SUCCESS');
  private readonly translateCreateFailed = this.translateService.instant('NOTIFICATIONS.CREATE_FAILED');

  public teachers: Teacher[];

  constructor(private teacherService: TeacherService,
              private toastrService: ToastrService,
              private translateService: TranslateService,
              private dialog: MatDialog) { }

  public ngOnInit(): void {
    this.teacherService.getTeachers().subscribe((teachers: Teacher[]) => {
      this.teachers = teachers;
    });
  }

  public createTeacher(): void {
    const dialogRef = this.dialog.open(TeacherEditDialogComponent);

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.teacherService.createTeacher(data.teacher).subscribe((teacher: Teacher) => {
          if (teacher) {
            this.toastrService.success('', this.translateCreated);
            this.teachers.unshift(teacher);
          }
          else {
            this.toastrService.error('', this.translateCreateFailed);
          }
        });
      }
    });
  }

  public onTeacherDelete(teacher: Teacher): void {
    this.teachers = this.teachers.filter(t => t.id !== teacher.id);
  }
}
