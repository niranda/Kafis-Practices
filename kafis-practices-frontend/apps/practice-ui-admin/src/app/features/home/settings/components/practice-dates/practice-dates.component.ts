import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminSettingsService  } from '@practice/common';
import { PracticeDates  } from '@practice/interfaces';

const sameDateValidator = (group: FormGroup) => {
  const start = new Date(group.get('startDate').value);
  const end = new Date(group.get('endDate').value);
  return start.getTime() !== end.getTime() ? null : { samedate: true }
}
const gradeLevelTranslates = ['FIRST_FULL_GRADE', 'FIRST_REDUCED_GRADE', 'SECOND_GRADE'];

@Component({
  selector: 'app-practice-dates',
  templateUrl: './practice-dates.component.html',
  styleUrls: ['./practice-dates.component.scss']
})
export class PracticeDatesComponent implements OnInit {

  public GRADE_LEVELS: { id: number, name: string, range: FormGroup }[]
  public initialAttorney: string;
  public attorney: FormGroup;

  constructor(
    private practiceDatesService: AdminSettingsService,
    private toastrService: ToastrService,
    private translateService: TranslateService,
  ) {
    this.GRADE_LEVELS = [];
  }

  ngOnInit() {
    this.practiceDatesService.getDates().subscribe((dates: PracticeDates[]) => {
      dates.forEach(date => {
        const { startDate, endDate, id, gradeLevel } = date;
        this.GRADE_LEVELS.push({
          id,
          name: gradeLevelTranslates[gradeLevel - 1],
          range: new FormGroup({
            startDate: new FormControl(startDate, [Validators.required, Validators.nullValidator]),
            endDate: new FormControl(endDate, [Validators.required, Validators.nullValidator])
          }, {
            validators: sameDateValidator,
          })
        })
      })
    });

    this.practiceDatesService.getAttorney().subscribe(attorney => {
      this.initialAttorney = attorney.value;
      this.attorney = new FormGroup({
        value: new FormControl(attorney.value)
      });
    });
  }

  public saveDates(): void {
    this.practiceDatesService.saveDates(this.GRADE_LEVELS.map((gradeLevel, i) => {
      return { ...gradeLevel.range.value, gradeLevel: i + 1, id: i + 1 };
    })).subscribe(response => {
      this.toastrService.success('', this.translateService.instant('NOTIFICATIONS.UPDATE_SUCCESS'));
    }, error => {
      this.toastrService.error(error.message || error, this.translateService.instant('NOTIFICATIONS.UPDATE_FAILED'));
    });
  }

  public upperFirstLetter(text: string) {
    return text[0].toUpperCase() + text.substring(1, text.length);
  }

  public isValidFrom(): boolean {
    return this.GRADE_LEVELS.every(grade => {
      const controls = grade.range.controls
      return grade.range.valid && controls['startDate'].valid && controls['endDate'].valid;
    })
  }
}
