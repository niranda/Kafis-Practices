import { filter, switchMap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StudentsService } from '@practice/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GradeLevel } from '@practice/enums';
import { of } from 'rxjs';

@Component({
  selector: 'app-admin-report-dialog',
  templateUrl: './admin-report-dialog.component.html',
  styleUrls: ['./admin-report-dialog.component.scss']
})
export class AdminReportDialogComponent implements OnInit {

  public specialties: string[];
  public lastSelectedYear: number;
  public lastSelectedGradeLevel: GradeLevel;

  public readonly gradeLevels = [
    ['FIRST_FULL_GRADE', GradeLevel.FirstFull],
    ['FIRST_REDUCED_GRADE', GradeLevel.FirstReduced],
    ['SECOND_GRADE', GradeLevel.Second]
  ];

  public form: FormGroup = new FormGroup({
    year: new FormControl(null, [Validators.required]),
    gradeLevel: new FormControl(null, [Validators.required]),
    specialty: new FormControl(null, [Validators.required])
  });

  private dialogWidth: number;

  @HostListener('window:resize')
  public setDialogResolution(): void {
    const width = window.innerWidth;
    if (width >= 1200) {
      this.dialogWidth = width * 0.38;
    }
    else if (width < 700) {
      this.dialogWidth = width;
    } else {
      this.dialogWidth = width * 0.7;
    }

    this.dialogRef.updateSize(this.dialogWidth.toString() + 'px');
  }

  constructor(
    private dialogRef: MatDialogRef<AdminReportDialogComponent>,
    private studentService: StudentsService,
  ) { }

  ngOnInit() {
    this.setDialogResolution();
    this.form.valueChanges.pipe(
      filter(data => {
        const { year, gradeLevel } = data;
        const wasChanged = !(year === this.lastSelectedYear && gradeLevel === this.lastSelectedGradeLevel);
        this.lastSelectedYear = year;
        this.lastSelectedGradeLevel = gradeLevel;
        return wasChanged && year !== null && gradeLevel !== null;
      }),
      switchMap(data => {
        const { year, gradeLevel } = data;
        return this.studentService.getSpecialties({
          year,
          gradeLevel
        });
      })
    ).subscribe((data: string[]) => {
      // this.form.controls['specialty'].setValue(null, { emitEvent: false });
      this.specialties = data;
    });
  }

  public submit(): void {
    this.dialogRef.close(this.form.value);
  }

}
