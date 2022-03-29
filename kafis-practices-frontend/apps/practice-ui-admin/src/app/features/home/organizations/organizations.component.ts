import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

import { OrganizationService } from '@practice/common';
import { Organization } from '@practice/interfaces';
import { OrganizationEditDialogComponent } from '@practice/ui/components/dialogs';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent implements OnInit {
  private readonly translateCreated = this.translateService.instant('NOTIFICATIONS.CREATE_SUCCESS');
  private readonly translateCreateFailed = this.translateService.instant('NOTIFICATIONS.CREATE_FAILED');

  public newOrganization: Organization;

  constructor(private organizationService: OrganizationService,
              private toastrService: ToastrService,
              private translateService: TranslateService,
              private dialog: MatDialog) { }

  public ngOnInit(): void {
  }

  public createOrganization(): void {
    const dialogRef = this.dialog.open(OrganizationEditDialogComponent);

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.organizationService.createOrganization(data.organization).subscribe((organization: Organization) => {
          if (organization) {
            this.toastrService.success('', this.translateCreated);
            this.newOrganization = organization;
          }
          else {
            this.toastrService.error('', this.translateCreateFailed);
          }
        });
      }
    });
  }
}
