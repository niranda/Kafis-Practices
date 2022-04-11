import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormGroup, FormControl} from '@angular/forms';
@Component({
    selector: 'date-gradelevel-select',
    templateUrl: 'date-gradelevel-select-dialog.component.html',
  })
  export class DateGradeSelectDialog {
    constructor() {}
    range = new FormGroup({
        start: new FormControl(),
        end: new FormControl(),
      });
    viel=this.range.value.start.value;
  }
  