import { Component, HostListener, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'practice-delete-confirmation-dialog',
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation-dialog.component.scss']
})
export class DeleteConfirmationDialogComponent implements OnInit {
  private dialogWidth: number;
  private entityType: string;
  public headerText: string;
  public contentText: string;

  constructor(private dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>,
              public translate: TranslateService) { }

  public ngOnInit(): void {
    this.setDialogResolution();
    this.entityType = this.dialogRef._containerInstance._config.data.entityType;

    this.headerText = `DIALOG.DELETE_${this.entityType}_HEADER`;
    this.contentText = `DIALOG.DELETE_${this.entityType}_CONTENT`;
  }

  public onDelete(): void {
    this.dialogRef.close({ isDeleteButtonClicked: true });
  }

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
}
