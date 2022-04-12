import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { GradeLevel } from '@practice/enums';
import { start } from 'repl';
@Component({
    selector: 'date-gradelevel-select',
    templateUrl: 'date-gradelevel-select-dialog.component.html',
  })
  export class DateGradeSelectDialog {
    constructor(
      public dialogRef: MatDialogRef<DateGradeSelectDialog>,
    ) {}
    range = new FormGroup({
        start: new FormControl('', [Validators.required]),
        end: new FormControl('', [Validators.required]),
        gradeLevel: new FormControl('', [Validators.required, Validators.min(1), Validators.max(3)]),
      });
      getStartErrorMessage() {
        if (this.range.value.get('start').hasError('required'))
          return 'Ви повинні вписати значення';      
    }
    getEndErrorMessage() {
      if (this.range.value.get('end').hasError('required'))
        return 'Ви повинні вписати значення';       
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

submit(){
localStorage.setItem('startDate',this.range.get('start').value);
localStorage.setItem('endDate',this.range.get('end').value);
localStorage.setItem('gradeLevel',this.range.get('gradeLevel').value);
this.dialogRef.close();
}
cancel(){
  this.dialogRef.close();
}
  }
