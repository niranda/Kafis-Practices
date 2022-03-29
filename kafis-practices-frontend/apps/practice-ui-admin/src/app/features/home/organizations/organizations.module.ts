import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';

import { UiComponentsTablesModule } from '@practice/ui/components/tables';

import { OrganizationsRoutingModule } from './organizations-routing.module';
import { OrganizationsComponent } from './organizations.component';

@NgModule({
  imports: [
    CommonModule,
    OrganizationsRoutingModule,
    TranslateModule.forChild(),
    MatButtonModule,
    ReactiveFormsModule,
    UiComponentsTablesModule,
    FormsModule
  ],
  declarations: [OrganizationsComponent]
})
export class OrganizationsModule { }
