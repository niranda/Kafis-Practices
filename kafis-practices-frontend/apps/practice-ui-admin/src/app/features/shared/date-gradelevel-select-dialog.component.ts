import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { GradeLevel } from '@practice/enums';
import { start } from 'repl';
@Component({
    selector: 'date-gradelevel-select',
    templateUrl: 'date-gradelevel-select-dialog.component.html',
  })
  export class DateGradeSelectDialog {
    constructor() {}
    range = new FormGroup({
        start: new FormControl('', [Validators.required]),
        end: new FormControl('', [Validators.required]),
        gradeLevel: new FormControl('', [Validators.required, Validators.min(1), Validators.max(3)]),
      });
      getStartErrorMessage() {
        if (this.range.value.get('start').hasError('required'))
          return 'You must enter a value';       
    }
    getEndErrorMessage() {
      if (this.range.value.get('end').hasError('required'))
        return 'You must enter a value';       
  }
  getGradeLevelErrorMessage() {
    if (this.range.value.get('gradeLevel').hasError('required'))
      return 'You must enter a value';       
}
changeGradeLevel(num: number){
  this.range.get('gradeLevel').setValue(num);
}
inputHandlerStart(event: any){
  this.range.get('end').setValue(parseInt(event.target.value)+1);
}
inputHandlerEnd(event: any){
  this.range.get('start').setValue(parseInt(event.target.value)-1);
}

Submit(){
  
}
  }
  