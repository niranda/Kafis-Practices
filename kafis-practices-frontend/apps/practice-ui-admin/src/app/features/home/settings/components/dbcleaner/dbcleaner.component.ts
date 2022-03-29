import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { DeleteConfirmationDialogComponent } from '@practice/ui/components/dialogs';
import { MatDialog } from '@angular/material/dialog';
import { AdminSettingsService } from '@practice/common';
import { EntityTypes } from '@practice/enums';

@Component({
  selector: 'app-dbcleaner',
  templateUrl: './dbcleaner.component.html',
  styleUrls: ['./dbcleaner.component.scss']
})
export class DbcleanerComponent {

  constructor(
    private adminSettingsService: AdminSettingsService,
    private dialog: MatDialog,
    private toastrService: ToastrService,
    private translateService: TranslateService,
  ) { }

  public clearDataBase(): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, { data: { entityType: EntityTypes.DataBase } });
    dialogRef.afterClosed().subscribe(isDeleteButtonClicked => {
      if (!isDeleteButtonClicked) return;
      this.adminSettingsService.clearDataBase().subscribe(response => {
        this.toastrService.success('', this.translateService.instant('NOTIFICATIONS.DELETE_SUCCESS'));
      }, error => {
        this.toastrService.error(error.message || error, this.translateService.instant('NOTIFICATIONS.DELETE_FAILED'));
      });
    });
  }
}
