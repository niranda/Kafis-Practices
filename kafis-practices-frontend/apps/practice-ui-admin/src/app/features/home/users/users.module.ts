import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { UiComponentsTablesModule } from '@practice/ui/components/tables';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    ReactiveFormsModule,
    FormsModule,
    UsersRoutingModule,
    UiComponentsTablesModule
  ],
  declarations: [UsersComponent]
})
export class UsersModule { }
