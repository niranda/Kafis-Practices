import { environment } from '@practice/environment';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';
import { AdminSettingsService, DocBuilderService } from '@practice/common';
import { Component, OnInit } from '@angular/core';
import { Student } from '@practice/interfaces';
import { StudentsService } from '@practice/common';
import { JWTService } from '@practice/feature-login';


@Component({
  selector: 'practice-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  public student: Student;
  public studentGradeLevels: {};
  public file: File;
  public fileIsSent = false;
  public readonly maxFileSize = environment.maxFilesize;
  public readonly acceptedFileFormats = ['.docx', '.doc', '.pdf'];
  public readonly acceptedFileFormatsList = this.acceptedFileFormats.join(', ');
  public readonly acceptedFileTypes = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword', 'application/pdf'];

  constructor(
    private attorneyService: AdminSettingsService,
    private studentService: StudentsService,
    private jwtService: JWTService,
    private docBuilderService: DocBuilderService,
    private toastrService: ToastrService,
    private translateService: TranslateService,
  ) { }

  public ngOnInit(): void {
    this.studentGradeLevels = this.studentService.getStudentGradeLevel();
    this.studentService.getStudentByUserId(this.jwtService.getUserId())
      .subscribe((student: Student) => {
        this.student = student;
      });
  }

  public uploadFile(files: File[]): void {
    if (!files.length) {
      return;
    }
    const file = files[0];

    if (!this.acceptedFileTypes.some(format => format === file.type)) {
      this.toastrService.error('', this.translateService.instant('NOTIFICATIONS.WRONG_FORMAT'));
      return;
    }
    if (file.size > this.maxFileSize) {
      this.toastrService.error('', this.translateService.instant('NOTIFICATIONS.MAX_FILESIZE'));
    } else {
      this.file = file;
      this.fileIsSent = false;
    }
  }


  public sendFile(): void {
    this.studentService.sendStudentReportFile(this.student.id, this.file).subscribe();
    this.fileIsSent = true;
  }

  public getContract(): void {
    this.attorneyService.getAttorney().subscribe(attorney => {
      this.docBuilderService.generateСontract({
        company: this.student.organization.name,
        person: '',
        specialty: this.student.specialty,
        studentName: this.student.fullName,
        year: String(this.student.year),
        startDate: formatDate(this.student.practiceDates.startDate, 'dd.MM.yy', 'en-US'),
        endDate: formatDate(this.student.practiceDates.endDate, 'dd.MM.yy', 'en-US'),
        signingYear: formatDate(this.student.practiceDates.startDate, 'yyyy', 'en-US'),
        attorney: attorney.value
      }).then((buffer: Buffer) => this.docBuilderService
        .downloadDoc(buffer, `Договір-${this.student.fullName.split(' ').join('_')}`));
    });
  }

  public getDiary(): void {
    this.docBuilderService.generateDiary({
      student: this.student
    }).then((buffer: Buffer) => this.docBuilderService
      .downloadDoc(buffer, `Щоденник_практики-${this.student.fullName.split(' ').join('_')}`))
  }

  public formatDate(date: string): string {
    return formatDate(date, 'dd.MM.yy', 'en-US')
  }
}
