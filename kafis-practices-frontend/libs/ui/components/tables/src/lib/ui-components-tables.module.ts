import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';

import { StudentsTable } from './students-table/students-table.component';
import { OrganizationsTableComponent } from './organizations-table/organizations-table.component';
import { UsersTableComponent } from './users-table/users-table.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    TranslateModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    StudentsTable,
    OrganizationsTableComponent,
    UsersTableComponent
  ],
  exports: [
    StudentsTable,
    OrganizationsTableComponent,
    UsersTableComponent
  ]
})
export class UiComponentsTablesModule {}
