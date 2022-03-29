import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

import { Student } from '@practice/interfaces';
import { StudentsService, FileService, DocBuilderService } from '@practice/common';
import { StudentGradeEditDialogComponent } from '@practice/ui/components/dialogs';

@Component({
  selector: 'practice-student-item',
  templateUrl: './student-item.component.html',
  styleUrls: ['./student-item.component.scss']
})
export class StudentItemComponent implements OnInit {
  private readonly translateUpdated = this.translateService.instant('NOTIFICATIONS.UPDATE_SUCCESS');
  private readonly translateUpdateFailed = this.translateService.instant('NOTIFICATIONS.UPDATE_FAILED');

  public studentGradeLevels: {};

  @Input() public student: Student;

  constructor(private studentService: StudentsService,
    private fileService: FileService,
    private translateService: TranslateService,
    private toastrService: ToastrService,
    private docBuilderService: DocBuilderService,
    private dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this.studentGradeLevels = this.studentService.getStudentGradeLevel();
  }

  public editStudentGrade(): void {
    const dialogRef = this.dialog.open(StudentGradeEditDialogComponent, { data: { student: this.student } });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.studentService.updateStudentGrade(data.student.id, data.student.grade).subscribe((student: Student) => {
          if (student) {
            this.toastrService.success('', this.translateUpdated);
            this.student = data.student;
          }
          else {
            this.toastrService.error('', this.translateUpdateFailed);
          }
        });
      }
    });
  }

  public downloadStudentReportFile(fileName: string): void {
    this.fileService.getReportFile(fileName).subscribe((file: any) => {
      const format = '.' + fileName.split('.').pop();
      this.docBuilderService.downloadDoc(file, 'Звіт_' + this.student.fullName.split(' ').join('_'), format);
    });
  }
}
