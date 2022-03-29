import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

import { OrganizationService } from '@practice/common';
import { Organization } from '@practice/interfaces';
import { DeleteConfirmationDialogComponent, OrganizationEditDialogComponent } from '@practice/ui/components/dialogs';
import { EntityTypes } from '@practice/enums';

@Component({
  selector: 'practice-organizations-table',
  styleUrls: ['./organizations-table.component.scss'],
  templateUrl: './organizations-table.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px'})),
        state('expanded', style({ height: '*' })),
        transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]})
export class OrganizationsTableComponent implements OnInit, OnChanges {
  private readonly translateUpdated = this.translateService.instant('NOTIFICATIONS.UPDATE_SUCCESS');
  private readonly translateUpdateFailed = this.translateService.instant('NOTIFICATIONS.UPDATE_FAILED');
  private readonly translateDeleted = this.translateService.instant('NOTIFICATIONS.DELETE_SUCCESS');
  private readonly translateDeleteFailed = this.translateService.instant('NOTIFICATIONS.DELETE_FAILED');

  public organizations: Organization[];

  displayedColumns: string[] = ['name'];
  dataSource: MatTableDataSource<Organization>;
  expandedElement: Organization | null;

  @Input() addedOrganization: Organization;

  @ViewChild(MatPaginator) set paginator(value: MatPaginator) {
    if(this.dataSource) {
      this.dataSource.paginator = value;
      this.dataSource.paginator._intl.itemsPerPageLabel = '';
      this.dataSource.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
        return `${page+1} / ${Math.ceil(length / pageSize)}`;
      };
    }
  }
  @ViewChild(MatSort, {static: false}) set sort(value: MatSort) {
    if(this.dataSource) {
      this.dataSource.sort = value;
    }
  }

  constructor(private organizationService: OrganizationService,
              public translateService: TranslateService,
              private toastrService: ToastrService,
              private dialog: MatDialog) {}

  public ngOnInit(): void {
    this.organizationService.getOrganizations().subscribe((organizations: Organization[]) => {
      this.organizations = organizations;
      this.initDataSource();
    });
  }

  public initDataSource(): void {
    this.dataSource = new MatTableDataSource(this.organizations);

    this.dataSource.sortData = (data: Organization[], sort: MatSort) => {
      this.expandedElement = null;
      return data.sort((a: Organization, b: Organization) => {
        if(sort.direction !== 'asc' && sort.direction !== 'desc') {
          return this.compareNumber(a.id, b.id, true);
        }
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'name': return this.compareString(a.name, b.name, isAsc);
          default: return 0;
        }
      });
    };
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public ngOnChanges({addedOrganization}: SimpleChanges): void {
    if (addedOrganization.currentValue !== addedOrganization.previousValue) {
      this.organizations.unshift(this.addedOrganization);
      this.dataSource._updateChangeSubscription();
    }
  }

  public editOrganization(organization: Organization): void {
    const index = this.dataSource.filteredData.indexOf(organization);
    const dialogRef = this.dialog.open(OrganizationEditDialogComponent, {data: {organization : organization}});

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.organizationService.updateOrganization(data.organization).subscribe((updatedOrganization: Organization) => {
          if (updatedOrganization) {
            this.toastrService.success('', this.translateUpdated);
            this.dataSource.data[index] = updatedOrganization;
            this.dataSource._updateChangeSubscription();
          }
          else {
            this.toastrService.error('', this.translateUpdateFailed);
          }
        });
      }
    });
  }


  public onDelete(organization: Organization): void {
    const index = this.dataSource.filteredData.indexOf(organization)
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {data: {entityType : EntityTypes.Organization}});

    dialogRef.afterClosed().subscribe(isDeleteButtonClicked => {
      if (isDeleteButtonClicked) {
        this.organizationService.deleteOrganization(organization.id).subscribe((isDeleteSuccessful: boolean) => {
          if (isDeleteSuccessful) {
            this.toastrService.success('', this.translateDeleted);
            this.dataSource.data.splice(index, 1);
            this.dataSource._updateChangeSubscription();
          }
          else {
            this.toastrService.error('', this.translateDeleteFailed);
          }
        });
      }
    });
  }

  private compareNumber(a: number, b: number, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  private compareString(a: string, b: string, isAsc: boolean) {
    if(!a && b) {
      return 1 * (isAsc ? 1 : -1);
    }
    else if(a && !b) {
      return -1 * (isAsc ? 1 : -1);
    }
    return a.localeCompare(b, 'uk') * (isAsc ? 1 : -1);
  }
}
