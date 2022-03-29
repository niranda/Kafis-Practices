import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { produce } from 'immer';

import { Teacher } from '@practice/interfaces';

@Component({
  selector: 'practice-teacher-edit-dialog',
  templateUrl: './teacher-edit-dialog.component.html',
  styleUrls: ['./teacher-edit-dialog.component.scss']
})
export class TeacherEditDialogComponent implements OnInit {

  private dialogWidth: number;
  private updatedTeacher: Teacher;
  public teacher: Teacher;

  constructor(private dialogRef: MatDialogRef<TeacherEditDialogComponent>,
              private fb: FormBuilder,
              public translate: TranslateService) { }

  public teacherFormGroup = this.fb.group({
    fullName: ['', [Validators.required]],
    position: ['', [Validators.required]]
  });

  public isInvalid(id: string): boolean {
    return (this.teacherFormGroup.get(id).touched && this.teacherFormGroup.get(id).invalid);
  }

  public ngOnInit(): void {
    this.setDialogResolution();

    this.teacher = this.dialogRef._containerInstance._config.data?.teacher;
    if (!this.teacher) { return; }
    this.teacherFormGroup.patchValue({
      fullName: this.teacher.fullName,
      position: this.teacher.position,
    });
  }

  public onSubmit(): void {
    if (!this.teacherFormGroup.valid) { return; }
    this.updatedTeacher = produce(this.teacher, () => {
      return {
        ...this.teacher,
        fullName: this.teacherFormGroup.get('fullName').value,
        position: this.teacherFormGroup.get('position').value
      };
    });
    this.dialogRef.close({ teacher: this.updatedTeacher });
  }

  @HostListener('window:resize')
  public setDialogResolution(): void {
    const width = window.innerWidth;
    if (width >= 1300) {
      this.dialogWidth = width * 0.3;
    }
    else if (width < 800) {
      this.dialogWidth = width;
    } else {
      this.dialogWidth = width * 0.5;
    }

    this.dialogRef.updateSize(this.dialogWidth.toString() + 'px');
  }
}
