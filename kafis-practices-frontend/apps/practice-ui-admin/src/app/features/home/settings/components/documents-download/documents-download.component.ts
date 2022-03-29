import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminSettingsService, DocBuilderService } from '@practice/common';
import { AdminOrderResponse, AdminReportResponse } from '@practice/interfaces';
import { AdminReportDialogComponent, AdminOrderDialogComponent } from '@practice/ui/components/dialogs';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-documents-download',
  templateUrl: './documents-download.component.html',
  styleUrls: ['./documents-download.component.scss']
})
export class DocumentsDownloadComponent implements OnInit {

  constructor(
    private adminSettingsService: AdminSettingsService,
    private dialog: MatDialog,
    private docBuilderService: DocBuilderService,
    private toastrService: ToastrService,
    private translateService: TranslateService,
  ) { }

  ngOnInit() {
  }

  public getReport(): void {
    const dialogRef = this.dialog.open(AdminReportDialogComponent);
    dialogRef.afterClosed().pipe(
      switchMap(data => {
        if (!data) return of(null);
        return this.adminSettingsService.getReportData(data);
      })
    ).subscribe((reportInputData: AdminReportResponse) => {
      reportInputData && this.docBuilderService.generateReport(reportInputData).then((buffer: Buffer) => this.docBuilderService
        .downloadDoc(buffer, `Звіт`));
    }, error => {
      this.toastrService.error(error.message || error, this.translateService.instant('NOTIFICATIONS.ERROR'));
    });
  }

  public getOrder(): void {
    const dialogRef = this.dialog.open(AdminOrderDialogComponent);
    dialogRef.afterClosed().pipe(
      switchMap(data => {
        if (!data) return of(null);
        return this.adminSettingsService.getOrderData(data);
      })
    ).subscribe((orderInputData: AdminOrderResponse[]) => {
      orderInputData && orderInputData.length && this.docBuilderService.generateOrder(orderInputData).then((buffer: Buffer) => this.docBuilderService
        .downloadDoc(buffer, `Наказ`));
    }, error => {
      this.toastrService.error(error.message || error, this.translateService.instant('NOTIFICATIONS.ERROR'));
    });
  }


}
