import { DbcleanerComponent } from './components/dbcleaner/dbcleaner.component';
import { AttorneyInputComponent } from './components/attorney-input/attorney-input.component';
import { DocumentsDownloadComponent } from './components/documents-download/documents-download.component';
import { PracticeDatesComponent } from './components/practice-dates/practice-dates.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    TranslateModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    SettingsComponent,
    PracticeDatesComponent,
    DocumentsDownloadComponent,
    AttorneyInputComponent,
    DbcleanerComponent,
  ],
  providers: [
    MatDatepickerModule,
  ]
})
export class SettingsModule { }
