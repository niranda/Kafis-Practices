import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import produce from 'immer';

import { Student } from '@practice/interfaces';

@Component({
  selector: 'practice-student-grade-edit-dialog',
  templateUrl: './student-grade-edit-dialog.component.html',
  styleUrls: ['./student-grade-edit-dialog.component.scss']
})
export class StudentGradeEditDialogComponent implements OnInit {

  private dialogWidth: number;
  private updatedStudent: Student;
  public student: Student;

  constructor(private dialogRef: MatDialogRef<StudentGradeEditDialogComponent>,
              private fb: FormBuilder,
              public translate: TranslateService) { }

  public studentFormGroup = this.fb.group({
    grade: ['', [Validators.min(0), Validators.max(100)]]
  }, { validators: this.ValidateIntegerGroups });

  public ValidateIntegerGroups(fb: FormGroup): void {
    var control = fb.get('grade');
    !Number.isInteger(+control.value) ? control.setErrors({ invalidType: true }) : null;
  }

  public isInvalid(id: string): boolean {
    return (this.studentFormGroup.get(id).touched && this.studentFormGroup.get(id).invalid);
  }

  public ngOnInit(): void {
    this.setDialogResolution();

    this.student = this.dialogRef._containerInstance._config.data?.student;
    if (!this.student) { return; }
    this.studentFormGroup.patchValue({
      grade: this.student.grade,
    });
  }

  public onSubmit(): void {
    if (!this.studentFormGroup.valid) { return; }
    this.updatedStudent = produce(this.student, () => {
      return {
        ...this.student,
        grade: this.studentFormGroup.get('grade').value
      };
    });
    this.dialogRef.close({ student: this.updatedStudent });
  }

  @HostListener('window:resize')
  public setDialogResolution(): void {
    const width = window.innerWidth;
    if (width >= 1300) {
      this.dialogWidth = width * 0.3;
    }
    else if (width >= 900) {
      this.dialogWidth = width * 0.4;
    }
    else {
      this.dialogWidth = width * 0.7;
    }

    this.dialogRef.updateSize(this.dialogWidth.toString() + 'px');
  }

}
