import { filter, switchMap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StudentsService } from '@practice/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DegreeLevel } from '@practice/enums';

@Component({
  selector: 'app-admin-order-dialog',
  templateUrl: './admin-order-dialog.component.html',
  styleUrls: ['./admin-order-dialog.component.scss']
})
export class AdminOrderDialogComponent implements OnInit {

  public specialties: string[];
  public readonly degreeLevels = [['BACHELOR', DegreeLevel.Bachelor], ['MASTER', DegreeLevel.Master]]
  public lastSelectedDegreeLevel: DegreeLevel;

  public form: FormGroup = new FormGroup({
    degreeLevel: new FormControl(null, [Validators.required]),
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
    private dialogRef: MatDialogRef<AdminOrderDialogComponent>,
    private studentService: StudentsService,
  ) { }

  ngOnInit() {
    this.setDialogResolution();
    this.form.valueChanges.pipe(
      filter(data => {
        const { degreeLevel } = data;
        const wasChanged = this.lastSelectedDegreeLevel !== degreeLevel;
        this.lastSelectedDegreeLevel = degreeLevel;
        return wasChanged && degreeLevel !== null;
      }),
      switchMap(data => {
        console.log('getSpec');
        return this.studentService.getSpecialtiesByDegree(data.degreeLevel)
      })
    ).subscribe((data: string[]) => {
      this.form.controls['specialty'].setValue(null, { emitEvent: false });
      this.specialties = data;
    });
  }

  public submit(): void {
    this.dialogRef.close(this.form.value);
  }
}
